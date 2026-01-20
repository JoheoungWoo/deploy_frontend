import React, { useEffect, useRef, useState } from "react";
import mqtt from "mqtt";

export default function UnityDrive() {
  const clientRef = useRef(null);

  const [ay, setAy] = useState(0); // 가속
  const [gy, setGy] = useState(0); // 조향

  useEffect(() => {
    const client = mqtt.connect(
      "wss://4a5fc65629c14cddb65aee8dbbe0eeee.s1.eu.hivemq.cloud:8884/mqtt",
      {
        username: "green1234",
        password: "green1234A",
      },
    );

    clientRef.current = client;

    client.on("connect", () => {
      console.log("MQTT Connected");
    });

    return () => client.end();
  }, []);

  // 값 바뀔 때마다 publish
  useEffect(() => {
    if (!clientRef.current) return;

    const payload = {
      ax: 0,
      ay: ay,
      az: 0,
      gx: 0,
      gy: gy,
      gz: 0,
    };

    clientRef.current.publish("bus/sensor", JSON.stringify(payload));
  }, [ay, gy]);

  return (
    <div style={{ padding: 20 }}>
      <h3>왼쪽: 가속 / 오른쪽: 방향</h3>

      {/* 가속 조이스틱 */}
      <div>
        <p>가속 (ay): {ay.toFixed(2)}</p>
        <input
          type="range"
          min="-1"
          max="1"
          step="0.05"
          value={ay}
          onChange={(e) => setAy(Number(e.target.value))}
        />
      </div>

      {/* 조향 조이스틱 */}
      <div style={{ marginTop: 20 }}>
        <p>조향 (gy): {gy.toFixed(2)}</p>
        <input
          type="range"
          min="-1"
          max="1"
          step="0.05"
          value={gy}
          onChange={(e) => setGy(Number(e.target.value))}
        />
      </div>
    </div>
  );
}
