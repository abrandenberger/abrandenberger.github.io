const enjoyContent = `
* Outside of scribbling mathematical nonsense, an unordered collection of things I enjoy: 
* building playful communal software like this <a href="https://curius.app/">social bookmarker</a>, 
* creating <a href="https://open.spotify.com/playlist/0mgJc653Q2kYsSQEwfK7AT?si=C1_8FKzLSumn8wY-7F5C7g">oddly</a> 
* <a href="https://open.spotify.com/playlist/3H1nr18GB6LPB6myTYek7c?si=IO34RAyIRjGXt_X_bGC5rQ">specific</a> 
* <a href="https://open.spotify.com/playlist/2IudEQhWMGZI6ucYxl4rbD?si=zEw3BPzPRMu6q1imp911bw">playlists</a>,
* playing piano, 
  * playing piano and cursing Rachmaninov's handspan, 
    * receiving recommendations, 
      * listening to friends ramble, 
        * catching a perfect photo, 
          * seeing things i created being used in the wild, 
            * committing to the bit, 
              * marveling, 
                * <a href="https://www.clarkart.edu/">well</a>-<a href="https://massmoca.org/">curated</a> <a href="https://www.fotografiska.com/">art</a> <a href="https://louisiana.dk/en/">museums</a>,
                * flashes of insight, 
                    * the hush before an orchestra begins to play, 
                      * <a href="https://www.sonetseigle.com/">buttery</a> <a href="https://aukouingamann.com/">croissants</a>,
                      * the bite of crisp winter wind, 
                        * <a href="https://www.perpetualstew.club/">stew</a> on a cold day,
                        * spicy harmonies, 
                          * long walks,
                            * libraries,
                              * lists,
                                * airports,
                                  * bass lines,
                                    * concert crowds,
                                      * weird calendar invites,
                                        * delightful interactions,
                                          * warm lighting,
                                            * working public transit,
                                              * yuzu-flavoured anything,
                                                * the plateau,
* and more.`;
const enjoyConfig = { textMode: TextMode.Html };
const enjoyNode = createTelescopicTextFromBulletedList(
  enjoyContent,
  enjoyConfig
);

const researchContent = `
* My research interests lie in 
* probability theory, 
  * probability theory (random discrete structures, probabilistic analysis of algorithms, statistical mechanics), 
* theoretical computer science and quantum information theory.`;
const researchNode = createTelescopicTextFromBulletedList(researchContent);

window.addEventListener("load", function () {
  const enjoyContain = document.getElementById("enjoy-container");
  enjoyContain.appendChild(enjoyNode);

  const researchContain = document.getElementById("research-container");
  researchContain.appendChild(researchNode);
});
