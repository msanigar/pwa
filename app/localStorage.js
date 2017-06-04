export const loadState = initialState => {
	try {
		const serializedState = localStorage.getItem('state');
		if (serializedState === null) {
			return initialState;
		}
		return JSON.parse(serializedState);
	} catch (err) {
		return undefined;
	}
};

export const saveState = state => {
	try {
		const serializedState = JSON.stringify(state);
		localStorage.setItem('state', serializedState);
	} catch (err) {
		// ignore errors
	}
};

(function() {
  if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/pwa/service-worker.js');
  }
})();