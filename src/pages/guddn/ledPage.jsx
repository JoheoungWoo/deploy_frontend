import React, { useEffect, useRef, useState } from "react";
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
  const [pwm, setPwm] = useState(0);
  const clientRef = useRef(null);

  useEffect(() => {
    const client = mqtt.connect(
      "wss://4a5fc65629c14cddb65aee8dbbe0eeee.s1.eu.hivemq.cloud:8884/mqtt",
      {
        username: "green1234",
        password: "green1234A",
        clientId: "react-pwm-ui",
      }
    );

    clientRef.current = client;

    client.on("connect", () => {
      console.log("MQTT connected");
      client.subscribe("jaeseok/sensor");
    });

    client.on("message", (topic, message) => {
      if (topic === "jaeseok/sensor") {
        const msg = JSON.parse(message.toString());
        msg.created_at = new Date().toLocaleTimeString();
        setData((prev) => [...prev.slice(-49), msg]);
      }
    });

    return () => client.end();
  }, []);

  // 🔴 PWM 슬라이더 변경 시 publish
  const handlePwmChange = (e) => {
    const value = Number(e.target.value);
    setPwm(value);

    if (clientRef.current?.connected) {
      clientRef.current.publish(
        "jaeseok/control",
        JSON.stringify({ pwm: value }),
        { qos: 1, retain: true }
      );
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>📡 MPU6050 Realtime Chart</h2>

      {/* PWM Slider */}
      <div style={{ margin: "20px 0" }}>
        <label>
          LED Brightness: <b>{pwm}</b>
        </label>
        <input
          type="range"
          min="0"
          max="255"
          value={pwm}
          onChange={handlePwmChange}
          style={{ width: "100%" }}
        />
      </div>

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
