import './ListingReviewVisual.css';

const ListingReviewVisual = ({reviewsSelected}) => {

    let avgCleanliness = 0;
    let avgCommunication = 0;
    let avgCheckin = 0;
    let avgAccuracy = 0;
    let avgLocation = 0;
    let avgValue = 0;

    reviewsSelected.forEach((review) => {
        avgCleanliness += review.cleanliness / reviewsSelected.length
        avgAccuracy += review.accuracy / reviewsSelected.length
        avgCommunication += review.communication / reviewsSelected.length
        avgLocation += review.location / reviewsSelected.length
        avgCheckin += review.checkin / reviewsSelected.length
        avgValue += review.value / reviewsSelected.length
    })

    const bgColor = `#505150`

    const cleanlinessVisual = {
      backgroundColor: bgColor,
      width: `${avgCleanliness/5*100}%`,
    }
    const accuracyVisual = {
      backgroundColor: bgColor,
        width: `${avgAccuracy/5*100}%`,
    }
    const communicationVisual = {
      backgroundColor: bgColor,
        width: `${avgCommunication/5*100}%`,
    }
    const LocatoinVisual = {
      backgroundColor: bgColor,
        width: `${avgLocation/5*100}%`,
    }
    const checkinVisual = {
        backgroundColor: bgColor,
        width: `${avgCheckin/5*100}%`,
    }
    const valueVisual = {
        backgroundColor: bgColor,
        width: `${avgValue/5*100}%`,
    }

    return (
        <div className='review-visual'>
            <div className='review-visual-left'>



                <div classNameclassName='review-visual-section'>
                    <h2>Cleanliness</h2>
                    <div>
                        <div style={cleanlinessVisual}></div>
                    </div>
                    <span>{parseFloat(avgCleanliness).toFixed(1)}</span>
                </div>


                <div classNameclassName='review-visual-section'>
                    <h2>Communication</h2>
                    <div>
                        <div style={communicationVisual}></div>
                    </div>
                    <span>{parseFloat(avgCommunication).toFixed(1)}</span>
                </div>

                <div>
                    <h2>Check-in</h2>
                    <div>
                        <div style={checkinVisual}></div>
                    </div>
                    <span>{parseFloat(avgCheckin).toFixed(1)}</span>
                </div>



                





            </div>
            <div className='review-visual-right'>
              <div>
                  <h2>Accuracy</h2>
                  <div>
                      <div style={accuracyVisual}></div>
                  </div>
                  <span>{parseFloat(avgAccuracy).toFixed(1)}</span>
                </div>


                <div>
                    <h2>Location</h2>
                    <div>
                        <div style={LocatoinVisual}></div>
                    </div>
                    <span>{parseFloat(avgLocation).toFixed(1)}</span>
                </div>



                <div>                    
                    <h2>Value</h2>
                    <div>
                        <div style={valueVisual} className="review-visual-bar"></div>
                    </div>
                    <span>{parseFloat(avgValue).toFixed(1)}</span>
                </div>
            </div>
        </div>
    );
}
 
export default ListingReviewVisual;