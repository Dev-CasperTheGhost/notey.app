import { NextPage } from "next";
import Link from "next/link";
import { NotFoundContainer, NotFoundTitle, NotFoundBtn } from "@styles/404";
import Head from "next/head";

const NotFound: NextPage = () => {
  return (
    <>
      <Head>
        <title>404 - Page not found.</title>
      </Head>
      <NotFoundContainer>
        <NotFoundTitle>404</NotFoundTitle>
        <Link href="/">
          <a href="/">
            <NotFoundBtn>Return home</NotFoundBtn>
          </a>
        </Link>
      </NotFoundContainer>
    </>
  );
};

export default NotFound;
