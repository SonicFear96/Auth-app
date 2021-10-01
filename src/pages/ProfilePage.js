import React, { useState, useEffect } from "react";

export const ProfilePage = () => {
  const [fieldsData, setFieldsData] = useState({ name: "", number: "" });
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetch("/getContacts")
      .then((res) => res.json())
      .then((data) => setContacts(data));
  }, []);

  const handleChange = (e) => {
    setFieldsData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fieldsData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.res === "ok") {
          setContacts((prev) => [...prev, data.contact]);
        }
      }) //react toast
      .catch((err) => console.log(err)); //react toast
  };

  return (
    <div>
      <h3>Добавить контакт</h3>
      <input placeholder="имя" name="name" onChange={(e) => handleChange(e)} />
      <input
        placeholder="номер"
        name="number"
        onChange={(e) => handleChange(e)}
      />
      <button onClick={(e) => handleSubmit(e)}>Войти</button>

      <h3>Список контактов</h3>
      {contacts.length &&
        contacts.map((el) => {
          return (
            <div key={el.id}>
              <span>
                {el.name} - {el.number}
              </span>
              <span> X</span>
            </div>
          );
        })}
    </div>
  );
};
