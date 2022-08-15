import { styled } from '@mui/system';
import TabsUnstyled from '@mui/base/TabsUnstyled';
import TabsListUnstyled from '@mui/base/TabsListUnstyled';
import TabPanelUnstyled from '@mui/base/TabPanelUnstyled';
import { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';
import TabUnstyled, { tabUnstyledClasses } from '@mui/base/TabUnstyled';

const Tab = styled(TabUnstyled)`
  font-family: inherit;
  color: #a6a6a6;
  cursor: pointer;
  font-size: 20px;
  font-weight: 500;
  background-color: transparent;
  width: 100%;
  padding: 12px 13px;
  margin: 5px 5px;
  border: none;
  border-radius: 11px;
  display: flex;
  justify-content: center;

  &:hover {
    background-color: rgba(244, 137, 33, 0.6);
    color: #ffffff;
  }

  &:focus {
  }

  &.${tabUnstyledClasses.selected} {
    background-color: #f48921;
    color: #ffffff;
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TabPanel = styled(TabPanelUnstyled)`
  width: 100%;
  font-family: inherit;
`;

const TabsList = styled(TabsListUnstyled)`
  max-width: 493px;
  width: 100%;
  background-color: rgba(229, 229, 229, 1);
  border-radius: 11px;
  margin-bottom: 39px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 15px auto;
`;

const Tabs = styled(TabsUnstyled)`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
`;

export { Tab, TabPanel, TabsList, Tabs };
