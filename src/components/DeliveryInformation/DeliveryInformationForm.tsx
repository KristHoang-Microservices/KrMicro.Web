import { ReactElement } from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/modal";
// @ts-ignore
import { UseModalProps } from "@nextui-org/modal/dist/use-modal";
import { Button, useDisclosure } from "@nextui-org/react";
import { DeliveryInformation } from "@/api/orders/models";
import { useForm } from "react-hook-form";
import { CreateDeliveryInformationRequest } from "@/api/orders/hooks/requests/deliveryInformation/createDeliveryInformation.request";
import { yupResolver } from "@hookform/resolvers/yup";
import { createDeliveryInformationSchema } from "@/api/orders/validations/deliveryInformation";
import { Input, Textarea } from "@nextui-org/input";
import {
  useCreateDeliveryInformation,
  useUpdateDeliveryInformation,
} from "@/api/orders/hooks/deliveryInformation";
import toast from "react-hot-toast";
import { useDeleteDeliveryInformation } from "@/api/orders/hooks/deliveryInformation/useDeleteDeliveryInformation";
import { Status } from "@/models";
import { CitySelect } from "@/components/CitySelect";
import { DistrictSelect } from "@/components/DistrictSelect";
import { WardSelect } from "@/components/WardSelect";

interface ModalProps {
  isOpen: boolean;
  onOpenChange: UseModalProps["onOpenChange"];
  data?: DeliveryInformation;
  customerId?: number;
}

export const DeliveryInformationForm = ({
  isOpen,
  onOpenChange,
  data,
  customerId,
}: ModalProps): ReactElement => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    resetField,
    watch,
    setValue,
  } = useForm<CreateDeliveryInformationRequest>({
    resolver: yupResolver(createDeliveryInformationSchema),
  });

  const { trigger: createDeliveryTrigger, isMutating: postingDelivery } =
    useCreateDeliveryInformation(customerId);

  const { trigger: updateDeliveryTrigger, isMutating: updatingDelivery } =
    useUpdateDeliveryInformation({ id: data?.id ?? -1, customerId });

  const onSubmit = async (formData: CreateDeliveryInformationRequest) => {
    if (data === undefined) {
      const create = await createDeliveryTrigger({
        ...formData,
        customerId: customerId,
      });
      if (create.isSuccess) {
        toast.success("Tạo mới thành công");
      }
      onOpenChange(false);
      return;
    }

    const update = await updateDeliveryTrigger({
      ...formData,
      customerId: customerId,
    });
    if (update.isSuccess) {
      toast.success("Cập nhật thành công");
    }

    onOpenChange(false);
  };

  const {
    isOpen: deleteOpen,
    onOpenChange: deleteOnOpenChange,
    onOpen: deleteOnOpen,
  } = useDisclosure();

  const { trigger: deleteMutate, isMutating: deleting } =
    useDeleteDeliveryInformation({
      customerId,
      deliveryInformationId: data?.id ?? -1,
    });

  const onDelete = async () => {
    const res = await deleteMutate({ status: Status.Deleted });
    if (res !== undefined) {
      toast.success("Xóa thành công!");
      deleteOnOpenChange();
      onOpenChange(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size={"3xl"}>
      <ModalContent>
        {(onClose) => (
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader className="flex flex-col gap-1">
              Địa chỉ giao hàng
            </ModalHeader>
            <ModalBody className={"grid grid-cols-2"}>
              <div className={"col-span-2"}>
                <Input
                  {...register("name")}
                  label={"Tên gợi nhớ"}
                  labelPlacement={"outside"}
                  placeholder={"Nhập tên gợi nhớ cho địa chỉ"}
                  isRequired={true}
                  className={"transition-all"}
                  isInvalid={errors.name !== undefined}
                  errorMessage={errors.name && errors.name?.message}
                  defaultValue={data?.name}
                />
              </div>
              <div className={"col-span-1"}>
                <Input
                  {...register("customerName")}
                  label={"Họ và tên"}
                  labelPlacement={"outside"}
                  placeholder={"Nhập họ và tên đầy đủ"}
                  isRequired={true}
                  className={"transition-all"}
                  isInvalid={errors.customerName !== undefined}
                  errorMessage={
                    errors.customerName && errors.customerName?.message
                  }
                  defaultValue={data?.customerName}
                />
              </div>
              <div className={"col-span-1"}>
                <Input
                  {...register("phone")}
                  label={"Số điện thoại"}
                  labelPlacement={"outside"}
                  placeholder={"Nhập số điện thoại"}
                  isRequired={true}
                  className={"transition-all"}
                  isInvalid={errors.phone !== undefined}
                  errorMessage={errors.phone && errors.phone?.message}
                  defaultValue={data?.phone}
                />
              </div>
              <div className={"col-span-2 font-semibold"}>
                <p>Địa chỉ nhận hàng</p>
              </div>
              <div className={"col-span-2 flex gap-4"}>
                <CitySelect
                  onSelected={(cityId) => {
                    if (cityId === undefined) {
                      resetField("cityId");
                      return;
                    }
                    setValue("cityId", cityId);
                  }}
                />
                <DistrictSelect
                  cityId={watch("cityId")}
                  onSelected={(districtId) => {
                    if (districtId === undefined) {
                      resetField("districtId");
                      return;
                    }
                    setValue("districtId", districtId);
                  }}
                />
                <WardSelect
                  districtId={watch("districtId")}
                  onSelected={(wardId) => {
                    if (wardId === undefined) {
                      resetField("wardId");
                      return;
                    }
                    setValue("wardId", wardId);
                  }}
                />
              </div>
              <div className={"col-span-2"}>
                <Textarea
                  {...register("fullAddress")}
                  label={"Địa chỉ cụ thể"}
                  labelPlacement={"outside"}
                  placeholder={"Nhập địa chỉ nhận hàng cụ thể"}
                  isRequired={true}
                  className={"transition-all"}
                  isInvalid={errors.fullAddress !== undefined}
                  errorMessage={
                    errors.fullAddress && errors.fullAddress?.message
                  }
                  defaultValue={data?.fullAddress}
                />
              </div>
            </ModalBody>
            <ModalFooter>
              {data !== undefined && (
                <>
                  <Button
                    color="danger"
                    variant="ghost"
                    onPress={deleteOnOpen}
                    isLoading={postingDelivery || updatingDelivery}
                  >
                    Xóa
                  </Button>
                  <Modal onOpenChange={deleteOnOpenChange} isOpen={deleteOpen}>
                    <ModalContent>
                      {(onClose) => (
                        <>
                          <ModalHeader>Xác nhận xóa địa chỉ này?</ModalHeader>
                          <ModalBody>Xóa địa chỉ : {data?.name}</ModalBody>
                          <ModalFooter>
                            <Button
                              isLoading={deleting}
                              variant={"light"}
                              onClick={onClose}
                            >
                              Hủy
                            </Button>
                            <Button
                              isLoading={deleting}
                              variant={"solid"}
                              color={"danger"}
                              onClick={onDelete}
                            >
                              Xóa
                            </Button>
                          </ModalFooter>
                        </>
                      )}
                    </ModalContent>
                  </Modal>
                </>
              )}
              <Button
                color="danger"
                variant="light"
                onPress={onClose}
                isLoading={postingDelivery || updatingDelivery}
              >
                Đóng
              </Button>
              <Button
                color="primary"
                type={"submit"}
                isLoading={postingDelivery || updatingDelivery}
              >
                {data === undefined ? "Tạo mới" : "Cập nhật"}
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
};
