import * as tf from "@tensorflow/tfjs";
import { decodeJpeg } from "@tensorflow/tfjs-react-native";
import * as FileSystem from "expo-file-system";
import * as ImageManipulator from "expo-image-manipulator";

export interface PredictionResult {
  gender: string;
  result: number;
}

const resizePhoto = async (uri: string, size: number[]) => {
  const actions = [{ resize: { width: size[0], height: size[1] } }];
  const saveOptions = {
    base64: true,
    format: ImageManipulator.SaveFormat.JPEG,
  };
  return await ImageManipulator.manipulateAsync(uri, actions, saveOptions);
};

export async function handlePredictPhoto(
  photoUri: string,
  model: tf.LayersModel | undefined,
): Promise<PredictionResult> {
  const { uri } = await resizePhoto(photoUri ?? "", [300, 300]);

  const imgB64 = await FileSystem.readAsStringAsync(uri, {
    encoding: FileSystem.EncodingType.Base64,
  });
  const imgBuffer = tf.util.encodeString(imgB64, "base64").buffer;
  const raw = new Uint8Array(imgBuffer);
  const imagesTensor = decodeJpeg(raw, 3);

  const processedTensor = tf.image.resizeBilinear(
    imagesTensor,
    [64, 64],
    false,
  );

  const expandedTensor = tf.expandDims(processedTensor, 0);
  const normalizedTensor = tf.div(expandedTensor, tf.scalar(255));

  const prediction = (await model?.predict([
    normalizedTensor,
  ])) as tf.Tensor<tf.Rank>;

  const result = await prediction.data();
  console.log("Predict " + result.toString());

  tf.dispose([imagesTensor, processedTensor, expandedTensor, prediction]);

  const gender = result[0] < 0.5 ? "Hembra" : "Macho";

  return { gender, result: result[0] };
}
