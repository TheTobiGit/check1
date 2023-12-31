import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import Vehicles from "../data/Vehicles.json";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  databaseURL: import.meta.env.VITE_databaseURL,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId,
  measurementId: import.meta.env.VITE_measurementId,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
const storage = getStorage(app);
const busesRef = ref(storage, "Buses");

const busesImagesUrl = async () => {
  const arr = [];
  const res = await listAll(busesRef); 

  await Promise.all(
    res.items.map(async (itemRef) => {
      const url = await getDownloadURL(ref(storage, itemRef.fullPath));
      arr.push({ url: url, ref: itemRef.name });
    })
  );

  return arr;
};

const getBusesImages = async () => {
  const urlArray = await busesImagesUrl();
  return urlArray;
};

export const NewVehicleData = () => {
  let modifiedVehicles = Vehicles;
  getBusesImages().then((urlArray) => {
    urlArray.forEach((url) => {
      const id = Number(url["ref"].charAt(0));
      for (const carType in modifiedVehicles) {
        const element = Vehicles[carType];
        for (const car of element) {
          if (car.id === id) {
            modifiedVehicles[carType][modifiedVehicles[carType].indexOf(car)][
              "image"
            ].push(url["url"]);
            return;
          }
        }
      }
    });
    return;
  });

  return modifiedVehicles;
};
