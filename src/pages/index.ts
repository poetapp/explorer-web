import { Landing } from './Landing/Loader'
import { Work } from "./Work/Loader";
import { Works } from "./Works/Loader";
import { Profile } from "./Profile/Loader";
import { Blocks } from "./Blocks/Loader";
import { Claim } from "./Blocks/Claim/Loader";
import { SingleBlock } from "./Blocks/SingleBlock/Loader";
import { CreateWork } from "./CreateWork/Loader";
import { SingleLicense } from './Licenses/Single/Loader';
import { Network } from "./Network";
import { Documentation } from "./Documentation";
import { Company } from './Company';
import { Account } from "./Account";
import { Login } from './Login/Loader';
import { MarketingLanding } from './MarketingLanding/Loader';

export default [
  Landing,
  MarketingLanding,
  Login,
  Work,
  Works,
  Blocks,
  Claim,
  SingleBlock,
  Profile,
  SingleLicense,
  CreateWork,
  ...Network,
  ...Documentation,
  ...Company,
  ...Account,
]
