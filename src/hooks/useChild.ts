import { useMutation, useQueryClient } from "react-query";
import {
  checkInChild,
  CheckInChildArgs,
  CheckInChildResponse,
  checkOutChild,
} from "../api";

export default function useChild(childId: string) {
  const queryClient = useQueryClient();
  const checkInChildMutation = useMutation<
    CheckInChildResponse,
    Error,
    CheckInChildArgs
  >(["childCheckIn", childId], checkInChild, {
    onSuccess: () => {
      queryClient.invalidateQueries("children");
    },
  });
  const checkOutChildMutation = useMutation(
    ["childCheckOut", childId],
    checkOutChild,
    {
      onSuccess: () => {
        queryClient.invalidateQueries("children");
      },
    }
  );

  return {
    // check in
    isCheckingInChild: checkInChildMutation.isLoading,
    checkInChildError: checkInChildMutation.error,
    checkInChildSuccess: checkInChildMutation.isSuccess,
    checkInChild: (pickupTime: string) =>
      checkInChildMutation.mutate({ childId, pickupTime }),
    // check out
    isCheckingOutChild: checkOutChildMutation.isLoading,
    checkOutChildError: checkOutChildMutation.error,
    checkOutChildSuccess: checkOutChildMutation.isSuccess,
    checkOutChild: () => checkOutChildMutation.mutate({ childId }),
  };
}
