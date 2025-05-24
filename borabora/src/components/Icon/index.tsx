import { IconType } from "react-icons/lib";

type Props = {
    icon: IconType;
  };
  
  const IconWrapper = ({ icon: Icon }: Props) => {
    return <Icon size={24}/>;
  };

export default IconWrapper;