(() => {

  const elements = {
      anglerInput: document.querySelector('#addForm input.angler'),
      weightInput: document.querySelector('#addForm input.weight'),
      speciesInput: document.querySelector('#addForm input.species'),
      locationInput: document.querySelector('#addForm input.location'),
      baitInput: document.querySelector('#addForm input.bait'),
      captureTimeInput: document.querySelector('#addForm input.captureTime'),
      addBtn: document.querySelector('#addForm button.add')
  };

  const CREATE_URL = "https://fisher-game.firebaseio.com/catches.json";
  const DELETE_URL = "https://fisher-game.firebaseio.com/catches/{catchId}.json";

  elements.addBtn.addEventListener('click', deleteCatch);

  async function addCatch() {

      let myCatch = {
          angler: elements.anglerInput.value,
          weight: elements.weightInput.value,
          species: elements.speciesInput.value,
          location: elements.locationInput.value,
          bait: elements.baitInput.value,
          captureTime: elements.captureTimeInput.value,
      };

      const options = {
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(myCatch),
          method: "POST"
      };

      try {
          const response = await fetch(CREATE_URL, options);
          const data = await response.json();

          console.log(data);
      } catch (e) {
          console.error(e);
      }




  }

  async function deleteCatch() {

      const catchId = "-M2JVy1q_oxtLLgBhzhY";
      const url = DELETE_URL.replace('{catchId}', catchId);

      try {

          const options = {
              headers: {
                  'Content-Type': 'application/json'
              },
              method: 'DELETE'
          };

          const response = await fetch(url, options); // return a PROMISE
          const data = await response.json();

          console.log(data);

      } catch (e) {
          console.error(e);
      }

  }

})();
