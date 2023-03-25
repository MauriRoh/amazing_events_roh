let template = "", template2 = "";

// FUNCTIONS
function header() {

    const headerNavbar = document.getElementById('headerNavbar');

    template += `
        <div>
            <!-- Navbar-->
            <div class="container-fluid" style="background-color:#181823">
                <nav class="navbar navbar-expand-sm" style="background-color:#181823">
                    <div class="container-fluid">
                        <a href="./index.html">
                            <img src="./static/images/Logo_Amazing_Events.png" height="35" alt="Logo Amazing Events"
                                style="background: #181823;">
                        </a>

                        <button class="navbar-toggler ms-auto navbar-right" style="color: #FFFFFF;" type="button"
                            data-bs-toggle="collapse" data-bs-target="#navbarToggleExternalContent"
                            aria-controls="navbarToggleExternalContent" aria-expanded="false"
                            aria-label="Toggle navigation">
                            <i class="fa-solid fa-bars"></i>
                        </button>

                        <div class="collapse navbar-collapse" id="navbarToggleExternalContent">
                            <ul class="navbar-nav ms-auto">
                                <li class="nav-item">
                                    <a class="navButton" style="background-color: #537FE7;" href="index.html">Home</a>
                                </li>
                                <li class="nav-item">
                                    <a class="navButton" href="./upcoming_events.html">Upcoming Events</a>
                                </li>
                                <li class="nav-item">
                                    <a class="navButton" href="./past_events.html">Past Events</a>
                                </li>
                                <li class="nav-item">
                                    <a class="navButton" href="./contact.html">Contact</a>
                                </li>
                                <li class="nav-item">
                                    <a class="navButton" href="./stats.html">Stats</a>
                                </li>
                            </ul>
                        </div>

                    </div>
                </nav>
            </div>
            <!-- END Navbar-->
            <!-- Slider -->
            <div class="container-fluid">
                <div class="row">
                    <div class="col-sm-2 contNavSlider">
                        <a class="contNavLink" href="./stats.html">&#8249;</a>
                    </div>
                    <div class="col-sm-8 contNavSlider">
                        <a class="contNavLink" href="#">HOME</a>
                    </div>
                    <div class="col-sm-2 contNavSlider">
                        <a class="contNavLink" href="./upcoming_events.html">&#8250;</a>
                    </div>
                </div>
            </div>
            <!-- END Slider -->
        </div>
        `
    headerNavbar.innerHTML = template;
};

function footer(){

    const footer = document.getElementById('footer');

    template2 += `
        <div class="container-fluid">
            <div class="row">

                <div class="col-sm-1 footerLink"></div>
                <div class="col-sm-2 LinkIconos">
                    <!-- Socialmedia -->
                    <a class="instagram" href="#">
                        <i class="fa-brands fa-instagram"></i>
                    </a>
                    <a class="facebook" href="#">
                        <i class="fa-brands fa-facebook"></i>
                    </a>
                    <a class="whatsApp" href="#">
                        <i class="fa-brands fa-whatsapp"></i>
                    </a>
                </div>
                <!-- END Socialmedia -->
                <div class="col-sm-8 footerLink">
                    <a class="linkCohort" href="#">Cohort</a>
                </div>
                <div class="col-sm-1 footerLink"></div>

            </div>
        </div>
        `
    footer.innerHTML = template2;
};



// CALL FUNCTIONS
header();
footer();