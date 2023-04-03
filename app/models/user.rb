class User < ApplicationRecord
  has_secure_password

  validates :username, uniqueness: true, length: { in: 3..30 }, 
    format: { without: URI::MailTo::EMAIL_REGEXP, message:  "can't be an email" }
  validates :email, uniqueness: true, length: { in: 3..255 }, 
    format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :session_token, presence: true, uniqueness: true
  validates :password_digest, presence: true
  validates :password, length: { in: 6..255 }, allow_nil: true

  attr_reader :password
  before_validation :ensure_session_token

  def password=(password)
    self.password_digest = BCrypt::Password.create(password)
    @password = password
  end

  def reset_session_token!
    self.session_token = generate_unique_session_token
    self.save!
    self.session_token
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def self.find_by_credentials(credential, password)
    if (credential in URI::MailTo::EMAIL_REGEXP)
      user = User.find_by(email: credential)
    else
      user = User.find_by(username: credential)
    end
    # user&.authenticate(password) ? user : nil 
    user && user.is_password?(password) ? user : nil
  end


  private
  def generate_unique_session_token
    # in a loop:
      # use SecureRandom.base64 to generate a random token
      # use `User.exists?` to check if this `session_token` is already in use
      # if already in use, continue the loop, generating a new token
      # if not in use, return the token
    token = SecureRandom::urlsafe_base64
    while User.exists?(session_token: token)
      token = SecureRandom::urlsafe_base64
    end
    token
  end

  def ensure_session_token
    # if `self.session_token` is already present, leave it be
    # if `self.session_token` is nil, set it to `generate_unique_session_token`
    self.session_token ||= generate_unique_session_token
  end
end
