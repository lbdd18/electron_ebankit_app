import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useSnackbar } from 'notistack';

import { api } from "../services/api";

interface VersionSetting {
  id?: string;
  version: string;
  isEnabled: boolean;
}

interface VersionSettingsProviderProps {
  children: ReactNode;
}

interface VersionSettingsContextData {
  versionSettings: VersionSetting[],
  createVersionSetting: (versionSetting: VersionSetting) => Promise<void>,
  deleteVersionSetting: (versionSettingID: string) => Promise<void>
}

const VersionSettingsContext = createContext<VersionSettingsContextData>(
  {} as VersionSettingsContextData
);

export function VersionSettingsProvider({ children }: VersionSettingsProviderProps) {
  const { enqueueSnackbar } = useSnackbar();
  const [versionSettings, setVersionSettings] = useState<VersionSetting[]>([]);

  useEffect(() => {
    api.get('versionSetting')
       .then(response => {setVersionSettings(response.data)})
  }, []);
  
  async function createVersionSetting(versionSettingInput: VersionSetting) {
    try {
      const response = await api.post('versionSetting', { version: versionSettingInput.version, isEnabled: versionSettingInput.isEnabled });
      const versionSetting = response.data;
      setVersionSettings([...versionSettings, versionSetting]);
      enqueueSnackbar('Version Setting created successfully!', { variant:'success', anchorOrigin:{vertical: 'bottom', horizontal: 'right',} });
    } catch (error) {
      enqueueSnackbar('Version Setting not created!', { variant:'error', anchorOrigin:{vertical: 'bottom', horizontal: 'right',} });
    }
    
  }

  async function deleteVersionSetting(versionSettingID: string) {
    try {
      await api.delete(`versionSetting/${versionSettingID}`);
      await api.get('versionSetting')
      .then(response => setVersionSettings(response.data));
      enqueueSnackbar('Version Setting deleted successfully!', { variant:'success', anchorOrigin:{vertical: 'bottom', horizontal: 'right',} });
    } catch (error) {
      enqueueSnackbar('Version Setting not deleted!', { variant:'error', anchorOrigin:{vertical: 'bottom', horizontal: 'right',} });
    }
  }

  return (
    <VersionSettingsContext.Provider value={{ versionSettings, createVersionSetting, deleteVersionSetting }}>
      {children}
    </VersionSettingsContext.Provider>
  )
}

export function useVersionSettings() {
  const context = useContext(VersionSettingsContext);

  return context;
}