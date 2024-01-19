import { LayersModel } from "@tensorflow/tfjs";
import { createContext } from "react";

const ModelContext = createContext<LayersModel | undefined>(undefined);

export default ModelContext;
