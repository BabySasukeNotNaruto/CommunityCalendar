import React from 'react';
import './Communities.css'; 
import image1 from './image1.png'; // Import images
import image2 from './image2.png';
import image3 from './image3.png';
import image4 from './image4.png';

const Communities = () => {
    return (
        <div className="content"> {/* Container for all community sections */}
            {/* Community HoopShooters */}
            <div>
                <img src={image1} alt="Image 1" /> {/* Image for HoopShooters*/}
                <h1>HoopShooters</h1>
                <p>This community is all about basketball, whether it's casual or competitive. </p> {/* Description */}
                <p>The HoopShooters community sets up different tournaments and casual games for the community to participate in.</p>
                <p>Want to join the HoopShooters community? Just go to one of the activities/events that they post on the calendar.</p>
            </div>
            {/* Community MoreYoga*/}
            <div>
                <img src={image2} alt="Image 2" /> {/* Image for MoreYoga */}
                <h2>MoreYoga</h2> 
                <p>MoreYoga is a community that offers various Yoga exercises and free sessions for anyone to enjoy!</p> {/* Description */}
                <p>MoreYoga offers free outside AND indoor yoga sessions available for anyone above the age 16. To join just attend an event.</p>
            </div>
            {/* Community Dodge the Ball */}
            <div>
                <img src={image3} alt="Image 3" /> {/* Image for Dodgeball */}
                <h3>Dodge the Ball</h3> 
                <p>This is a community that actively sets up fun dodgeball games in either local highschool gyms or outside courts.</p> {/* Description */}
                <p>These activities include competitive tournaments for teams that are signed up through Dodge the Ball. To join just attend an activity that is on the calendar.</p>
            </div>
            {/* Community Outdoor Movie Night */}
            <div>
                <img src={image4} alt="Image 4" /> {/* Image for Movie Night */}
                <h3>Outdoor Movie Night</h3> 
                <p>This is a community that invites all to watch a movie outside in a parking lot, watch in your car or bring a chair.</p> {/* Description */}
                <p>All attendance is free of charge and snacks will available to be purchase at the event, or bring your own!</p>
            </div>
        </div>
    );
};

export default Communities;
