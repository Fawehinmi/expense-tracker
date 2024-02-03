import {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

interface IAppState {
  formData: { name: string; value: string }[];
  setFormData: Dispatch<SetStateAction<{ name: string; value: string }[]>>;
}

const ApContext = createContext<IAppState | null>(null);

export function useAppState() {
  const context = useContext(ApContext);

  if (context === null) {
    throw new Error("Context must be used inside a provider");
  }

  return context;
}

interface IProps {
  children: React.ReactNode;
}

export const ApContextProvider: React.FC<IProps> = ({ children }) => {
  const [formData, setFormData] = useState<{ name: string; value: string }[]>([
    {},
  ] as any);
  return (
    <ApContext.Provider value={{ formData, setFormData }}>
      {children}
    </ApContext.Provider>
  );
};
