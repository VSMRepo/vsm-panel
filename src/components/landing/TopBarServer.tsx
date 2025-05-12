import UserServer from "../UserServer";
import TopBarClient from "./TopBarClient";

export default function TopBarServer() {
  return <TopBarClient rightSlot={<UserServer />} />;
}
