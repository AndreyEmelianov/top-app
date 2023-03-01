import React, { useState } from 'react';
import { Button, Htag, Input, P, Rating, Tag, Textarea } from '@/components';
import { withLayout } from '@/layout/Layout';
import { GetStaticProps } from 'next';
import axios from 'axios';
import { MenuItem } from '@/interfaces/menu.interface';
import { API } from '@/helpers/api';

function Home({ menu }: HomeProps): JSX.Element {
  const [rating, setRating] = useState<number>(4);

  return (
    <>
      <Htag tag="h1">Заголовок</Htag>
      <Button appearance="primary" arrow="right">
        Кнопка Клик
      </Button>
      <Button appearance="ghost" arrow="down">
        Кнопка Клик
      </Button>
      <P fontSize="l">New paragraph L</P>
      <P>New paragraph M</P>
      <P fontSize="s">New paragraph S</P>
      <Tag size="s">ghost</Tag>
      <Tag size="m" color="red">
        hh.ru
      </Tag>
      <Tag size="s" color="green">
        green
      </Tag>
      <Tag color="primary">green</Tag>
      <Rating rating={rating} isEditable setRating={setRating} />
      <Input placeholder="тест" />
      <Textarea placeholder="test ares" />
    </>
  );
}

export default withLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const firstCategory = 0;
  const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
    firstCategory,
  });
  return {
    props: {
      menu,
      firstCategory,
    },
  };
};

interface HomeProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: number;
}
