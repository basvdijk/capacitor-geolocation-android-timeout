import { SplashScreen } from "@capacitor/splash-screen";
import { Camera } from "@capacitor/camera";
import { Geolocation } from "@capacitor/geolocation";

window.customElements.define(
  "capacitor-welcome",
  class extends HTMLElement {
   
    constructor() {
      super();

      SplashScreen.hide();

      const root = this.attachShadow({ mode: "open" });

      root.innerHTML = `
    <style>
      :host {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        display: block;
        width: 100%;
        height: 100%;
      }
      h1, h2, h3, h4, h5 {
        text-transform: uppercase;
      }
      .button {
        display: inline-block;
        padding: 10px;
        background-color: #73B5F6;
        color: #fff;
        font-size: 0.9em;
        border: 0;
        border-radius: 3px;
        text-decoration: none;
        cursor: pointer;
      }
      main {
        padding: 15px;
      }
      main hr { height: 1px; background-color: #eee; border: 0; }
      main h1 {
        font-size: 1.4em;
        text-transform: uppercase;
        letter-spacing: 1px;
      }
      main h2 {
        font-size: 1.1em;
      }
      main h3 {
        font-size: 0.9em;
      }
      main p {
        color: #333;
      }
      main pre {
        white-space: pre-line;
      }
    </style>
    <div>
      <capacitor-welcome-titlebar>
        <h1>Capacitor</h1>
      </capacitor-welcome-titlebar>
      <main>

        <pre id="gps-data">
        </pre>

        <p>
        <button class="button" id="start-gps">Start live gps</button>
      </p>

      </main>
    </div>
    `;
    }


    async connectedCallback() {
      const self = this;

      let previousTime = 0;

      self.shadowRoot
        .querySelector("#start-gps")
        .addEventListener("click", async function (e) {
          try {

            await Geolocation.watchPosition(
              { enableHighAccuracy: true, timeout: 2000, maximumAge: 2500 },
      
              (position) => {

                const currentTime = Date.now();
                const deltaTime = currentTime - previousTime;
                previousTime = currentTime

                console.log(position);
                if (position) {
                  console.log(
                    "Current position:",
                    position.coords.longitude,
                    position.coords.latitude,
                    deltaTime
                  );
      
                  self.shadowRoot
                  .querySelector("#gps-data").innerHTML = 
                    `Current position: 
                    time:  ${position.timestamp}
                    lon:   ${position.coords.longitude}
                    lat:   ${position.coords.latitude},
                    delta: ${deltaTime}ms`;
                  
                }
              }
            );

          } catch (e) {
            console.warn("User cancelled", e);
          }
        });
     
    }
  }
);

window.customElements.define(
  "capacitor-welcome-titlebar",
  class extends HTMLElement {
    constructor() {
      super();
      const root = this.attachShadow({ mode: "open" });
      root.innerHTML = `
    <style>
      :host {
        position: relative;
        display: block;
        padding: 15px 15px 15px 15px;
        text-align: center;
        background-color: #73B5F6;
      }
      ::slotted(h1) {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        font-size: 0.9em;
        font-weight: 600;
        color: #fff;
      }
    </style>
    <slot></slot>
    `;
    }
  }
);
