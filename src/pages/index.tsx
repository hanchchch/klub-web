import React, { useState } from "react";
import styles from "./index.module.scss";
import Main from "@src/components/templates/Main";
import Card from "@src/components/atoms/Card";

export default function Index() {
  const [show, setShow] = useState<"set" | "all">("set");

  return (
    <Main>
      <div className={styles.header}>
        <div className={styles.logo}>
          <embed src={"/assets/klub_logo.svg"} />
        </div>
        <div className={styles.choice}>
          <div
            className={show === "set" ? styles.active : ""}
            onClick={() => setShow("set")}
          >
            SET
          </div>
          <div
            className={show === "all" ? styles.active : ""}
            onClick={() => setShow("all")}
          >
            ALL
          </div>
        </div>
      </div>
      <div className={styles.container}>
        <Card>
        </Card>
        <Card>
        </Card>
        <Card>
        </Card>
        <Card>
        </Card>
      </div>
    </Main>
  );
}
