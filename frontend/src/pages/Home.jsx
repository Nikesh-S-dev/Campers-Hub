import Equipments from './Equipments.jsx';
import Locations from './Locations';
import { Link } from 'react-router-dom';
import '../css/Home.css';

import LogoBlack2 from '../assets/images/LogoBlack2.png';
import background_image from '../assets/images/background_image.jpeg';
import equipments from '../assets/images/equipments.png';
import bg_loc_image_light from '../assets/images/bg_loc_image_light.jpeg';
import caravan from '../assets/images/caravan.png'

function Home (){

    return(
        <div className='homepage'>
            <div className='logo-container'>
                <img src={LogoBlack2} className='logo'/>
            </div>
            <div className='top-section'>
                <img src={background_image} className='top-section-bg'/>
                <div className='top-section-contents'>
                    <h1>Your Ultimate Adventure Starts Here</h1>
                    <h2>Equipment, Caravan Conversions, and the best spots to pitch your tent - All in one place.</h2>
                    
                    <div className='top-links'>
                        <nav>
                            <a href="#services_section" className='top-section-link'>Explore Services</a>
                            <a href="#about_section" className='top-section-link'>About Us</a>
                        </nav>
                    </div>
                </div>
            </div>

            <section id="services_section" className="mid-section">
                <h1>Services</h1>
                <div className="services">
                    <Link to='/equipments'>
                        <div className="service-card">
                            <img src={equipments} className='service-card-img'/>
                            <div className="service-card-content">
                                <h3>Shop Gear</h3>
                                <p className='extra-text'>Explore the necessary Equipments for camping, and be Equiped with all the tools you might need while Camping</p>
                            </div>
                        </div>
                    </Link>
                    <Link to='/locations'>
                        <div className="service-card">
                            <img src={bg_loc_image_light} className='service-card-img'/>
                            <div className="service-card-content">
                                <h3>Explore Locations</h3>
                                <p className='extra-text'>Explore and Find out the Camping Spot that is made for you. Like match made in heaven 😌</p>
                            </div>
                        </div>
                    </Link>
                    <Link to='/caravanConvertion'>
                        <div className="service-card-3">
                            <img src={caravan} className='service-card-img'/>
                            <div className="service-card-content">
                                <h3>Caravan Convertion</h3>
                                <p className='extra-text'>Customize and Convert your cars/vans into best suitable for camping. So you would have a cozy and safe caravans for sleeping at night, insead of looking out for rooms</p>
                            </div>
                        </div>
                    </Link>
                </div>
            </section>
            <section  id="about_section" className="bottom-section">
                <div className="about">
                    <h1>About Us</h1>
                    <div className="about-bubble">
                        <h3>Our Story: From One Tent to a Community</h3>
                        <p>
                            It started with a single, poorly packed weekend trip and a realization: the best adventures happen when you’re prepared. Whether it was struggling with a tent in the dark or dreaming of a home on wheels while parked by a lake, we’ve been there.
                            We built CampersHub to be the digital compass we wished we had—a place where had the reliability of expert gear guides and curated locations.
                        </p>
                    </div>
                    <div className="about-bubble">
                        <h3>What Drives Us</h3>
                        <p>Our mission is simple: To make the wild accessible. We believe that whether you are a weekend warrior in a pup tent or a full-time nomad in a custom van, the outdoors should feel like home.</p>
                    </div>
                    <div className="about-bubble">
                        <h3>Why Choose us?</h3>
                        <p>
                            Expert Gear & Information: We don't just list equipment; we provide the detailed description sp you can use it safely and effectively.
                            Caravan Conversion: We provide you the Information about caravan conversion companies on nearby state.
                            Tailored for You: Our "Guest & Account" feature allows you to save your progress, favorite locations, and gear checklists securely and giving you a personalized experience every time you log in.
                        </p>
                    </div>
                    <div className="about-bubble">
                        <h3>The Team Behind the Adventure</h3>
                        <p>We are a team of campers, builders, and tech enthusiasts dedicated to providing a reliable digital destination for adventure seekers worldwide. We’re constantly updating our database of locations and guides to ensure you have the most current information for your next journey.</p>
                    </div>
                </div>
                <div className="contact">
                    <h2>Have an issue? Contact us:</h2>
                    <div className="contact-info">
                        <div className="whatsapp">
                            <img src="https://download.logo.wine/logo/WhatsApp/WhatsApp-Logo.wine.png"/>
                            <h3>9741846525, 8123138518</h3>
                        </div>
                        <div className="gmail">
                            <img src="https://static.vecteezy.com/system/resources/previews/013/948/544/non_2x/gmail-logo-on-transparent-white-background-free-vector.jpg"/>
                            <h3>supportCampersHub@gmail.com</h3>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home;