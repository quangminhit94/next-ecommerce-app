import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { useRouter } from "next/dist/client/router";

export interface AccountDetailProps {
  account: any;
}

export default function AccountDetailPage({ account }: AccountDetailProps) {
  const router = useRouter();
  if (!account) return null;
  console.log(account);
  return (
    <div>
      account Detail Page
      <p>{account.fullName}</p>
      <p>{account.accountNumber}</p>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  console.log("\nGET STATIC PATHS");
  const API_URL = "https://react-bank-data.herokuapp.com/api/accounts?_page=1";
  const response = await fetch(API_URL);
  const data = await response.json();
  return {
    paths: data.data.map((x: any) => ({ params: { id: x.id } })),
    fallback: false
  };
};

export const getStaticProps: GetStaticProps<AccountDetailProps> = async (
  context: GetStaticPropsContext
) => {
  console.log("\nGET STATIC PROPS", context.params?.id);
  const accountId = context.params?.id;
  if (!accountId) return { notFound: true };
  // server side
  // build time
  const API_URL = `https://react-bank-data.herokuapp.com/api/accounts/${accountId}`;
  const response = await fetch(API_URL);
  const data = await response.json();

  return {
    props: {
      account: data.data
    }
  };
};
