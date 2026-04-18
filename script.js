const connBox = document.getElementById("conn");
const statusBox = document.getElementById("status");
const distanceBox = document.getElementById("distance");
const logBox = document.getElementById("log");
const indicator = document.getElementById("indicator");

// ================= MQTT CONFIG =================
const options = {
    username: "uts-esp32-parkir",
    password: "uts-esp32-parkir"
};

const client = mqtt.connect(
    "wss://uts-esp32-parkir.cloud.shiftr.io",
    options
);

// ================= TOPIC =================
const topicControl = "parkir/led/control";
const topicDistance = "parkir/distance";
const topicStatus = "parkir/status";

// ================= CONNECT =================
client.on("connect", () => {
    connBox.innerHTML = "Terhubung ke MQTT";
    connBox.style.background = "#2ecc71";

    addLog("MQTT Connected");

    client.subscribe(topicDistance);
    client.subscribe(topicStatus);
});

// ================= TERIMA DATA =================
client.on("message", (topic, message) => {
    const msg = message.toString();

    addLog("[" + topic + "] " + msg);

    // DATA JARAK
    if (topic === topicDistance) {
        distanceBox.innerHTML = msg + " cm";
    }

    // STATUS PARKIR
    if (topic === topicStatus) {
        statusBox.innerHTML = msg;

        // WARNA DINAMIS + INDIKATOR
        if (msg === "KOSONG") {
            statusBox.style.color = "#2ecc71";
            indicator.style.background = "#2ecc71";
        } else if (msg === "MOBIL MASUK") {
            statusBox.style.color = "#f1c40f";
            indicator.style.background = "#f1c40f";
        } else if (msg === "TERISI") {
            statusBox.style.color = "#e74c3c";
            indicator.style.background = "#e74c3c";
        } else {
            statusBox.style.color = "#e67e22";
            indicator.style.background = "#e67e22";
        }
    }
});

// ================= ERROR =================
client.on("error", (err) => {
    connBox.innerHTML = "Gagal connect";
    connBox.style.background = "#e74c3c";
    addLog("Error: " + err.message);
});

// ================= CONTROL LED =================
function kirim(pesan) {
    client.publish(topicControl, pesan);
    addLog("Kirim: " + pesan);
}

// ================= LOG =================
function addLog(text) {
    logBox.innerHTML += text + "<br>";
    logBox.scrollTop = logBox.scrollHeight;
}