// set up modal
const modal = document.querySelector("#myModal");
// const btn = document.querySelector("#myBtn");
const close = document.querySelector(".close");
const question = document.querySelector(".question");
const response = document.querySelector(".response");
const submit = document.querySelector("button");
const answer = document.querySelector(".answer");
// btn.addEventListener("click", e => {
//   e.preventDefault();
//   modal.style.display = "block";
// })
// close.addEventListener("click", e => {
//   e.preventDefault();
//   modal.style.display = "none";
// })
// window.addEventListener("click", e => {
//   e.preventDefault();
//    if (event.target == modal) {
//     modal.style.display = "none";
//   }
// })

// instantiate cloudinary to set config
const cloudinaryCld = cloudinary.Cloudinary.new({ cloud_name: "pictures77" });

// wait for the player id element to load
document.addEventListener("DOMContentLoaded", (e) => {
  const media = cloudinaryCld.videoPlayer("player", {
    playedEventTimes: [3, 7.5, 12, 16.5, 21],
    posterOptions: {
      // publicId: "cats-and-dogs",
      transformation: { border: "7px_solid_red",aspect_ratio: 1.5, width: 400 ,crop:"fill"},
    },
  });
  media.on("timeplayed", (event) => {
    if (event.eventData.time === 12) {
      question.innerHTML = "How many kittens?";
      response.innerHTML = "correct answer: 1";
      submit.addEventListener("click", (e) => {
        response.style.display = "block";
      });
      media.pause();
      modal.style.display = "block";
    } else if (event.eventData.time === 21) {
      question.innerHTML = "How many puppies?";
      response.innerHTML = "correct answer: 2";
      submit.addEventListener("click", (e) => {
        response.style.display = "block";
      });
      media.pause();
      modal.style.display = "block";
    } else {
      // modalContent.innerHTML = null;
    }
    // alert('timeplayed: ' + event.eventData.time)
    console.log(event.eventData.time + " seconds played");
  });
  media.source("slides-video", {
    sourceTypes: ["mp4"],
    transformation: { aspect_ratio: "1.5",width: 400 ,crop:"fill" },
  });

  // player.source('rafting', {
  //   sourceTypes: ['hls'],
  //   transformation: { streaming_profile: 'full_hd' }
  // })

  close.addEventListener("click", (e) => {
    e.preventDefault();
    question.innerHTML = "";
    answer.value = "";
    response.innerHTML = "";
    response.style.display = "none";

    response.innerHTML = null;
    modal.style.display = "none";
    media.play();
  });
  window.addEventListener("click", (e) => {
    e.preventDefault();
    if (event.target == modal) {
      modal.style.display = "none";
    }
  });
  // var media = cloudinaryCld.videoPlayer("media", {
  //   publicId: "training/m-tutorial-dashboard-intro-o",
  //   muted: false,
  //   transformation: { border: "15px_solid_black", audio_frequency: 44100 },
  //   sourceTransformation: {
  //     hls: { border: "15px_solid_black", audio_frequency: 44100 },
  //   },
  //   posterOptions: {
  //     publicId: "training/m-tutorial-dashboard-intro-o",
  //     start_offset: 5,
  //     format: "jpg",
  //     resource_type: "video",
  //     transformation: { border: "7px_solid_black" },
  //   },
  //   playbackRates: [0.5, 1, 1.5, 2],
  // });
});

// When the user clicks anywhere outside of the modal, close it
