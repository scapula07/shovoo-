import { useRecoilState } from "recoil";
import { executionGraphStore } from "@/recoil";

export function useUpdateNodeInputs() {
  const [graph, setGraph] = useRecoilState(executionGraphStore);

  const updateInputs = (class_type: string, newInputs: Record<string, any>) => {
    const updatedGraph = { ...graph };

    for (const key in updatedGraph) {
      if (updatedGraph[key].class_type === class_type) {
        updatedGraph[key] = {
          ...updatedGraph[key],
          inputs: {
            ...updatedGraph[key].inputs,
            ...newInputs,
          },
        };
        break;
      }
    }

    setGraph(updatedGraph);
  };

  return updateInputs;
}
