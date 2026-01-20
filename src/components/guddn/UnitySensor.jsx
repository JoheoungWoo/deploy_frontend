import React, { useState, useEffect } from "react";
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

export default function UnitySensor() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const client = mqtt.connect(
      "wss://4a5fc65629c14cddb65aee8dbbe0eeee.s1.eu.hivemq.cloud:8884/mqtt",
      {
        username: "green1234",
        password: "green1234A",
      },
    );

    client.on("connect", () => {
      console.log("MQTT connected (bus/sensor)");
      client.subscribe("bus/sensor");
    });

    client.on("message", (topic, message) => {
      try {
        const msg = JSON.parse(message.toString());
        msg.created_at = new Date().toLocaleTimeString();

        setData((prev) => [...prev.slice(-49), msg]);
      } catch (e) {
        console.error("JSON parse error:", e);
      }
    });

    return () => client.end();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>📡 Unity Sensor (bus/sensor)</h2>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <XAxis dataKey="created_at" />
          <YAxis />
          <Tooltip />
          <Legend />

          {/* Acceleration */}
          <Line
            type="monotone"
            dataKey="ax"
            name="AX"
            stroke="#ff0000"
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="ay"
            name="AY"
            stroke="#00ff00"
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="az"
            name="AZ"
            stroke="#0000ff"
            dot={false}
          />

          {/* Gyroscope */}
          <Line
            type="monotone"
            dataKey="gx"
            name="GX"
            stroke="#ff00ff"
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="gy"
            name="GY"
            stroke="#00ffff"
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="gz"
            name="GZ"
            stroke="#ffa500"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
