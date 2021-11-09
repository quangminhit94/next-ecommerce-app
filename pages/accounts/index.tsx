import { GetStaticProps, GetStaticPropsContext } from "next";
import { useRouter } from "next/dist/client/router";

export interface AccountListPageProps {
  accounts: any[];
}

export default function AccountListPage({ accounts }: AccountListPageProps) {
  const router = useRouter();

  function handleClick(accountId: any) {
    router.push({
      pathname: `/accounts/[id]`,
      query: {
        id: accountId,
        ref: "social"
      }
    });
  }

  return (
    <div>
      account List Page
      <ul>
        {accounts.map((x) => (
          <li key={x.id} onClick={() => handleClick(x.id)}>
            {x.fullName}
          </li>
        ))}
      </ul>
    </div>
  );
}
export const getStaticProps: GetStaticProps<AccountListPageProps> = async (
  context: GetStaticPropsContext
) => {
  // server side
  // build time
  const API_URL = "https://react-bank-data.herokuapp.com/api/accounts?_page=1";
  const response = await fetch(API_URL);
  const data = await response.json();
  console.log(data);

  return {
    props: {
      accounts: data.data
    }
  };
};
