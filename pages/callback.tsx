import Router from "next/router";
import { useEffect } from "react";

export default function Callback() {
  useEffect(() => {
    let token = Router.asPath.substring(23, 207);

    Router.push(`/api/spotify/?token=${token}`);
  }, []);

  return <div></div>;
}
