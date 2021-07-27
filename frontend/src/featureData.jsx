import { FaShippingFast } from 'react-icons/fa';
import { CgArrowRightO } from 'react-icons/cg';
import { VscTools, VscCreditCard } from 'react-icons/vsc';
import { GiCardExchange } from 'react-icons/gi';
import { AiOutlineBank } from 'react-icons/ai';

const featuresData = [
  {
    id: 1,
    feature: 'fast delevery',
    featureIcon: <FaShippingFast />,
    arrowIcon: <CgArrowRightO />,
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto temporibus ',
  },
  {
    id: 2,
    feature: 'Easy return',
    featureIcon: <GiCardExchange />,
    arrowIcon: <CgArrowRightO />,
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto temporibus ',
  },
  {
    id: 3,
    feature: 'professional assembly',
    featureIcon: <VscTools />,
    arrowIcon: <CgArrowRightO />,
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto temporibus ',
  },
  {
    id: 4,
    feature: 'payment options',
    featureIcon: <VscCreditCard />,
    arrowIcon: <CgArrowRightO />,
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto temporibus ',
  },
  {
    id: 5,
    feature: 'fast credit',
    featureIcon: <AiOutlineBank />,
    arrowIcon: <CgArrowRightO />,
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto temporibus ',
  },
];

export default featuresData;
