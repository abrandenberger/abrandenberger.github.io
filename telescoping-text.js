const enjoyContent = `
* Outside of scribbling mathematical nonsense, I run <a href="https://math.mit.edu/arts/">Friends of the Arts</a>
* at MIT, build fun communal software (check out <a href="https://curius.app/">Curius</a>, a social bookmarker), 
* and enjoy
* creating <a href="https://open.spotify.com/playlist/0mgJc653Q2kYsSQEwfK7AT?si=C1_8FKzLSumn8wY-7F5C7g">oddly</a> 
* <a href="https://open.spotify.com/playlist/3H1nr18GB6LPB6myTYek7c?si=IO34RAyIRjGXt_X_bGC5rQ">specific</a> 
* <a href="https://open.spotify.com/playlist/1n7Tb8bbonPG7xtiU4XK8F?si=6540cc354f554fc0">playlists</a>,
* playing piano, 
  * playing piano and cursing Rachmaninov's handspan, 
  * receiving recommendations, 
    * listening to friends ramble, 
      * seeing things i created being used in the wild, 
        * mixing chemicals in the darkroom,
          * capturing my friends' <a href="https://math.mit.edu/~hannamul/">next</a> <a href="https://angusjlowe.github.io/index.html">featured</a> <a href="https://bchin336.github.io/">photo</a>,
            * committing to the bit, 
              * marveling, 
                * <a href="https://www.clarkart.edu/">well</a>-<a href="https://massmoca.org/">curated</a> <a href="https://stockholm.fotografiska.com/">art</a> <a href="https://louisiana.dk/en/">museums</a>,
                * flashes of insight, 
                    * the hush before an orchestra begins to play, 
                      * <a href="https://www.junothebakery.com/">buttery</a> <a href="https://aukouingamann.com/">croissants</a>,
                      * the bite of crisp winter wind, 
                        * <a href="https://www.perpetualstew.club/">stew</a> on a cold day,
                        * spicy harmonies, 
                          * long walks,
                            * libraries,
                              * handcrafted websites,
                                * bass lines,
                                  * concert crowds,
                                    * weird calendar invites,
                                      * delightful interactions,
                                        * midnight conversations,
                                          * morning hikes,
                                            * warm lighting,
                                              * public transit,
                                                * yuzu-flavoured anything,
                                                  * the plateau,
* and more.`;
const enjoyConfig = { textMode: TextMode.Html };
const enjoyNode = createTelescopicTextFromBulletedList(
  enjoyContent,
  enjoyConfig,
);

window.addEventListener("load", function () {
  const enjoyContain = document.getElementById("enjoy-container");
  enjoyContain.appendChild(enjoyNode);
});
