import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import Vehicles from "../data/Vehicles.json";

const firebaseConfig = {
  apiKey: "AIzaSyDDEAyQM4FFHusjg8C0FRClqNnzf7G5T8E",
  authDomain: "AIzaSyDDEAyQM4FFHusjg8C0FRClqNnzf7G5T8E",
  databaseURL: "https://puc-transport-unit-default-rtdb.firebaseio.com",
  projectId: "puc-transport-unit",
  storageBucket: "puc-transport-unit.appspot.com",
  messagingSenderId: "579137315951",
  appId: "1:579137315951:web:c3cad900db6c4d2ab1999a",
  measurementId: "G-PT7KM6C0NQ",
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
