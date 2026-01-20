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

export default function UnityDrive() {
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
      client.subscribe("bus/sensor");
    });

    client.on("message", (topic, message) => {
      try {
        const raw = JSON.parse(message.toString());

        const msg = {
          created_at: new Date().toLocaleTimeString(),
          ax: Number(raw.ax),
          ay: Number(raw.ay),
          az: Number(raw.az),
          gx: Number(raw.gx),
          gy: Number(raw.gy),
          gz: Number(raw.gz),
        };

        setData((prev) => [...prev.slice(-49), msg]);
      } catch (e) {
        console.error(e);
      }
    });

    return () => client.end();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <XAxis dataKey="created_at" />
          <YAxis />
          <Tooltip />
          <Legend />

          <Line dataKey="ax" stroke="#ff0000" dot={false} />
          <Line dataKey="ay" stroke="#00ff00" dot={false} />
          <Line dataKey="az" stroke="#0000ff" dot={false} />

          <Line dataKey="gx" stroke="#ff00ff" dot={false} />
          <Line dataKey="gy" stroke="#00ffff" dot={false} />
          <Line dataKey="gz" stroke="#ffa500" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
