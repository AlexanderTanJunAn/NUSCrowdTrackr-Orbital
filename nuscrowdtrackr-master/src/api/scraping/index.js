import { Router } from "express";
import { getData } from "../../services/scraping";
import firebaseConfig from "../../firebaseconfig";
import * as firebase from "firebase/app";
import "firebase/database";

// Initialize Firebase
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}
const database = firebase.database();
const router = new Router();

router.get("/", async (req, res) => {
  try {
    let i;
    const data = async () => {
      const temp = await getData();
      const length = temp.length;
      for (i = 0; i < length; i++) {
        if (temp[i].rule_name === "Enter") {
          database.ref("/Enter/" + i).set({
            id: temp[i].event_id,
            time: temp[i].time,
            camera: temp[i].channel_id,
          });
        } else if (temp[i].rule_name === "Exit") {
          database.ref("/Exit/" + i).set({
            id: temp[i].event_id,
            time: temp[i].time,
            camera: temp[i].channel_id,
          });
        }
      }
      return temp;
    };
    const result = await data();
    res.send(result);
  } catch (err) {
    if (err.errors) {
      res.send({ error: err.errors[0].message });
    } else {
      console.log(err);
      res.send({ error: "Something went wrong" });
    }
  }
});

export default router;
