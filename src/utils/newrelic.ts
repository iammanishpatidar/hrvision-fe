// // import { init } from "@newrelic/browser-agent";
// import { init } from "@newrelic/browser-agent";
// init({
//   applicationID: "6443212",
//   licenseKey: "NRJS-21a1832c541052e2425",
//   trustKey: "6443212",
//   distributedTracing: { enabled: true },
//   logging: { level: "info" },
// });

// declare global {
//   interface Window {
//     newrelic?: string;
//   }
// }

// export const setupNewRelic = () => {
//   if (typeof window !== "undefined" && window.newrelic) {
//     window.newrelic.setCustomAttribute("app_loaded", true);
//     console.log("New Relic Initialized");
//   } else {
//     console.warn("New Relic not available");
//   }
// };
declare global {
  interface Window {
    newrelic?: {
      setCustomAttribute: (key: string, value: string | number | object) => void;
      addPageAction?: (actionName: string, params?: Record<string, string>) => void;
      noticeError?: (error: Error, params?: Record<string, string>) => void;
    };
  }
}

// ✅ Replace these with your actual New Relic credentials
const NEW_RELIC_APP_ID = '6443212'; // Your Application ID
// const NEW_RELIC_LICENSE_KEY = "NRJS-21a1832c541052e2425"; // Your License Key
// const NEW_RELIC_TRUST_KEY = "6443212"; // Usually same as App ID
const NEW_RELIC_AGENT_URL = 'https://js-agent.newrelic.com/nr-loader-spa-1.238.0.min.js'; // New Relic Agent

/**
 * Function to dynamically load the New Relic script if it's not already present.
 */
export const loadNewRelicScript = () => {
  if (typeof window !== 'undefined' && !window.newrelic) {
    console.log('🚀 Loading New Relic script...');

    const script = document.createElement('script');
    script.src = NEW_RELIC_AGENT_URL;
    script.async = true;

    script.onload = () => {
      console.log('✅ New Relic script loaded.');

      // ✅ Manually set App ID in New Relic Attributes
      if (window.newrelic?.setCustomAttribute) {
        window.newrelic.setCustomAttribute('app_id', NEW_RELIC_APP_ID);
        window.newrelic.setCustomAttribute('app_loaded', 'true');
      }
    };

    document.head.appendChild(script);
  } else {
    console.log('✅ New Relic already loaded.');
  }
};

/**
 * Initializes New Relic tracking and ensures the agent is ready.
 */
export const initializeNewRelic = () => {
  if (typeof window !== 'undefined') {
    const maxRetries = 10; // Retry up to 10 times
    let attempts = 0;

    const checkNewRelic = setInterval(() => {
      if (window.newrelic?.setCustomAttribute) {
        // ✅ Convert boolean to string as New Relic does not support boolean values
        window.newrelic.setCustomAttribute('app_loaded', 'true');
        console.log('✅ New Relic Initialized: app_loaded event tracked.');
        clearInterval(checkNewRelic); // Stop checking
      } else {
        attempts++;
        console.warn(`⚠️ New Relic not ready yet (Attempt ${attempts}/10)`);
        if (attempts >= maxRetries) {
          clearInterval(checkNewRelic);
          console.error('❌ New Relic failed to initialize after multiple attempts.');
        }
      }
    }, 1000); // Check every second
  }
};

/**
 * Track custom user interactions.
 */
export const trackUserAction = (action: string, params?: Record<string, string>) => {
  if (window.newrelic?.addPageAction) {
    window.newrelic.addPageAction(action, params);
    console.log(`✅ Tracked User Action: ${action}`, params);
  } else {
    console.warn('⚠️ New Relic is not ready: Unable to track user action.');
  }
};

/**
 * Report errors to New Relic.
 */
export const reportError = (error: Error, params?: Record<string, string>) => {
  if (window.newrelic?.noticeError) {
    window.newrelic.noticeError(error, params);
    console.log('✅ Reported Error to New Relic:', error.message);
  } else {
    console.warn('⚠️ New Relic is not ready: Unable to report error.');
  }
};
