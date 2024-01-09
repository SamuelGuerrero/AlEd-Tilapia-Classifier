import * as tf from "@tensorflow/tfjs";
import { bundleResourceIO } from "@tensorflow/tfjs-react-native";

const modelJson = require("../vgg16Model/model.json");

const modelWeights = [
  require("../vgg16Model/group1-shard1of15.bin"),
  require("../vgg16Model/group1-shard2of15.bin"),
  require("../vgg16Model/group1-shard3of15.bin"),
  require("../vgg16Model/group1-shard4of15.bin"),
  require("../vgg16Model/group1-shard5of15.bin"),
  require("../vgg16Model/group1-shard6of15.bin"),
  require("../vgg16Model/group1-shard7of15.bin"),
  require("../vgg16Model/group1-shard8of15.bin"),
  require("../vgg16Model/group1-shard9of15.bin"),
  require("../vgg16Model/group1-shard10of15.bin"),
  require("../vgg16Model/group1-shard11of15.bin"),
  require("../vgg16Model/group1-shard12of15.bin"),
  require("../vgg16Model/group1-shard13of15.bin"),
  require("../vgg16Model/group1-shard14of15.bin"),
  require("../vgg16Model/group1-shard15of15.bin"),
];

export const loadModel = async () => {
  await tf.ready();
  const model = await tf.loadLayersModel(
    bundleResourceIO(modelJson, modelWeights),
  );
  return model;
};
