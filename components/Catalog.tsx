import { FC } from 'react';
import { useState } from "react"; 
import Card from "antd/lib/card/Card";
import Pagination from "antd/lib/pagination/Pagination";
import UsersDTO from "@/dto/UsersDTO";

import Image from "next/image";

type UsersProps = {
    usersData: UsersDTO[]
  };

const Catalog: FC<UsersProps> = ({ usersData }) => {

    console.log(usersData);
    const [minValue, setMinValue]= useState(0);
    const [maxValue, setMaxValue] = useState(4);
  const numEachPage = 4; 

    const handleChange = (value: number) => {
        setMinValue((value - 1) * numEachPage);
        setMaxValue(value * numEachPage);
      };

    return(
        <>
            {usersData.slice(minValue, maxValue).map(user => (
                <Card
                key={user._id}
                style={{ width: 240 }}
                cover={<Image alt="avatar" src={`${user.avatar}`} width={240} height={300}/>}
                >
                <p>{user.lastName}</p>
            </Card>
            ))}
            <Pagination
            defaultCurrent={1}
            defaultPageSize={numEachPage} //default size of page
            onChange={handleChange}
            total={usersData.length} //total number of card data available
            />
        </>
    )
}

export default Catalog;