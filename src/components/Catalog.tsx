import { FC } from "react";
import { useState } from "react";
import Card from "antd/lib/card/Card";
import Pagination from "antd/lib/pagination/Pagination";
import Row from "antd/lib/grid/row";
import Col from "antd/lib/grid/col";
import Select from "antd/lib/select/index";
import Input from "antd/lib/input/Input";
import Button from "antd/lib/button/button";
import UsersDTO from "@/src/dto/UsersDTO";
import Form from "antd/lib/form/Form";
import FormItem from "antd/lib/form/FormItem";
import dayjs from "dayjs";
import styles from "@/styles/Catalog.module.css";

import Image from "next/image";

type UsersProps = {
  usersData: UsersDTO[];
};

const Catalog: FC<UsersProps> = ({ usersData }) => {
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(10);
  const [newUsersData, setNewUsersData] = useState(usersData);
  const numEachPage = 10;

  const handleChange = (value: number) => {
    setMinValue((value - 1) * numEachPage);
    setMaxValue(value * numEachPage);
  };

  const refetch = async (values: any) => {
    Object.keys(values).forEach((key) => {
      if (
        values[key] === undefined ||
        values[key] === "" ||
        values[key] === null
      ) {
        delete values[key];
      }
    });
    const res = await fetch(
      `http://localhost:3000/api/getUsers?${new URLSearchParams(
        values
      ).toString()}`
    );
    const usersData: UsersDTO[] = await res.json();
    setNewUsersData(usersData);
  };

  return (
    <Row>
      <Col>
        <Form onFinish={refetch} layout="vertical">
          <Row justify={"start"} gutter={20}>
            <Col>
              <FormItem name="sortingBy" label="Поле сортировки">
                <Select
                  style={{ width: 182 }}
                  options={[
                    { value: "age", label: "Возрасту" },
                    { value: "birthdate", label: "Дате рождения" },
                    { value: "createdAt", label: "Дате регистрации" },
                  ]}
                ></Select>
              </FormItem>
            </Col>
            <Col>
              <FormItem name="sortingOrder" label="Порядок сортировки">
                <Select
                  style={{ width: 182 }}
                  options={[
                    { value: "ASC", label: "По возрастанию" },
                    { value: "DESC", label: "По убыванию" },
                  ]}
                ></Select>
              </FormItem>
            </Col>
          </Row>
          <Row justify={"start"} gutter={20}>
            <Col>
              <FormItem name="firstName" label="Имя">
                <Input placeholder="Фильтр по имени"></Input>
              </FormItem>
            </Col>
            <Col>
              <FormItem name="lastName" label="Фамилия">
                <Input placeholder="Фильтр по Фамилии"></Input>
              </FormItem>
            </Col>
            <Col>
              <FormItem name="email" label="Email">
                <Input placeholder="Фильтр по Фамилии"></Input>
              </FormItem>
            </Col>
            <Col>
              <FormItem name="gender" label="Пол">
                <Select
                  style={{ width: 120 }}
                  options={[
                    { value: "male", label: "Мужской" },
                    { value: "female", label: "Женский" },
                  ]}
                ></Select>
              </FormItem>
            </Col>
            <Col>
              <FormItem name="subscription" label="Тип подписки">
                <Select
                  style={{ width: 120 }}
                  options={[
                    { value: "free", label: "Бесплатная" },
                    { value: "basic", label: "Базовая" },
                    { value: "business", label: "Бизнес" },
                  ]}
                ></Select>
              </FormItem>
            </Col>
          </Row>

          <Row>
            <FormItem>
              <Button type="primary" htmlType="submit">
                Применить
              </Button>
            </FormItem>
          </Row>
        </Form>
        <Row justify={"center"} gutter={[50, 16]}>
          {newUsersData.slice(minValue, maxValue).map((user) => (
            <Col key={user._id} className="gutter-row">
              <Card
                key={user._id}
                title={`${user.firstName} ${user.lastName}`}
                className={styles.card}
                bordered={true}
                cover={
                  <Image
                    alt="avatar"
                    src={`${user.avatar}`}
                    width={30}
                    height={180}
                  />
                }
              >
                <p>{`Дата рождения: ${dayjs(user.birthdate).format(
                  "DD.MM.YYYY"
                )}`}</p>
                <p>{`Email: ${user.email}`}</p>
                <p>{`Возраст: ${user.age}`}</p>
                <p>{`Пол: ${user.gender}`}</p>
                <p>{`Подписка: ${user.subscription}`}</p>
                <p>{`Аккаунт создан: ${dayjs(user.createdAt).format(
                  "DD.MM.YYYY"
                )}`}</p>
              </Card>
            </Col>
          ))}
        </Row>
        <Row justify={"center"} style={{ margin: "15px" }}>
          <Col>
            <Pagination
              defaultCurrent={1}
              defaultPageSize={numEachPage} //default size of page
              onChange={handleChange}
              total={newUsersData.length} //total number of card data available
              hideOnSinglePage={true}
              pageSizeOptions={[10]}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Catalog;
