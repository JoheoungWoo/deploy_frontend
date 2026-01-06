import React, { useState, useEffect, useRef } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import mqtt from "mqtt";

export default function ledPage() {
  const [data, setData] = useState([]);
  const clientRef = useRef(null);

  useEffect(() => {
    const client = mqtt.connect(
      "wss://4a5fc65629c14cddb65aee8dbbe0eeee.s1.eu.hivemq.cloud:8884/mqtt",
      {
        username: "green1234",
        password: "green1234A",
      }
    );

    clientRef.current = client;

    client.on("connect", () => {
      console.log("MQTT connected");
      client.subscribe("jaeseok/sensor");
    });

    client.on("message", (topic, message) => {
      if (topic === "jaeseok/sensor") {
        try {
          const msg = JSON.parse(message.toString());
          msg.created_at = new Date().toLocaleTimeString();
          setData((prev) => [...prev.slice(-49), msg]);
        } catch (e) {
          console.error(e);
        }
      }
    });

    return () => client.end();
  }, []);

  // 🔴 LED ON
  const ledOn = () => {
    clientRef.current.publish("jaeseok/control", JSON.stringify({ led: "on" }));
  };

  // ⚫ LED OFF
  const ledOff = () => {
    clientRef.current.publish(
      "jaeseok/control",
      JSON.stringify({ led: "off" })
    );
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>📡 MPU6050 Realtime Chart</h2>

      <button onClick={ledOn}>LED ON</button>
      <button onClick={ledOff} style={{ marginLeft: 10 }}>
        LED OFF
      </button>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <XAxis dataKey="created_at" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="ax" stroke="#ff0000" dot={false} />
          <Line type="monotone" dataKey="ay" stroke="#00ff00" dot={false} />
          <Line type="monotone" dataKey="az" stroke="#0000ff" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
