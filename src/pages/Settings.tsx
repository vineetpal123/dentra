import React, { useEffect, useState } from "react";
import {
  Container,
  Title,
  Card,
  Section,
  SectionTitle,
  Grid,
  Field,
  Input,
  ImageUpload,
  ToggleRow,
  SaveButton,
} from "./settings.styled";

const SettingsPage = () => {
  const [form, setForm] = useState({
    fullName: "Dr. John Smith",
    email: "dr.smith@example.com",
    clinicName: "Dentra Dental Clinic",
    clinicAddress: "123 Elm Street, Springfield, IL",
    notifications: {
      reminders: true,
      messages: true,
      alerts: false,
    },
    profileImage: "",
  });

  const [password, setPassword] = useState({
    old: "",
    new: "",
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleNotificationChange = (key: string) => {
    setForm({
      ...form,
      notifications: {
        ...form.notifications,
        [key]: !form.notifications[key as keyof typeof form.notifications],
      },
    });
  };

  const handleImage = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setForm({
        ...form,
        profileImage: URL.createObjectURL(file),
      });
    }
  };

  const handleSave = () => {
    console.log("Saved:", form);
    alert("Settings saved!");
  };

  return (
    <>
      <Title>Settings</Title>

      <Card>
        {/* Profile Settings */}
        <Section>
          <SectionTitle>Profile Settings</SectionTitle>

          <ImageUpload>
            <img
              src={form.profileImage || "https://via.placeholder.com/80"}
              alt="profile"
            />
            <input type="file" onChange={handleImage} />
          </ImageUpload>

          <Grid>
            <Field>
              <label>Full Name</label>
              <Input
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
              />
            </Field>

            <Field>
              <label>Email Address</label>
              <Input name="email" value={form.email} onChange={handleChange} />
            </Field>
          </Grid>
        </Section>

        {/* Notification Preferences */}
        <Section>
          <SectionTitle>Notification Preferences</SectionTitle>

          <ToggleRow>
            <label>Appointment Reminders</label>
            <input
              type="checkbox"
              checked={form.notifications.reminders}
              onChange={() => handleNotificationChange("reminders")}
            />
          </ToggleRow>

          <ToggleRow>
            <label>Patient Messages</label>
            <input
              type="checkbox"
              checked={form.notifications.messages}
              onChange={() => handleNotificationChange("messages")}
            />
          </ToggleRow>

          <ToggleRow>
            <label>System Alerts</label>
            <input
              type="checkbox"
              checked={form.notifications.alerts}
              onChange={() => handleNotificationChange("alerts")}
            />
          </ToggleRow>
        </Section>

        {/* Clinic Settings */}
        <Section>
          <SectionTitle>Clinic Settings</SectionTitle>

          <Field>
            <label>Clinic Name</label>
            <Input
              name="clinicName"
              value={form.clinicName}
              onChange={handleChange}
            />
          </Field>

          <Field>
            <label>Clinic Address</label>
            <Input
              name="clinicAddress"
              value={form.clinicAddress}
              onChange={handleChange}
            />
          </Field>
        </Section>

        {/* Password */}
        <Section>
          <SectionTitle>Password</SectionTitle>

          <Grid>
            <Input
              placeholder="Old Password"
              type="password"
              onChange={(e) =>
                setPassword({ ...password, old: e.target.value })
              }
            />

            <Input
              placeholder="New Password"
              type="password"
              onChange={(e) =>
                setPassword({ ...password, new: e.target.value })
              }
            />
          </Grid>
        </Section>

        <SaveButton onClick={handleSave}>Save Changes</SaveButton>
      </Card>
    </>
  );
};

export default SettingsPage;
