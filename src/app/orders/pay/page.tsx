"use client";
import { Key, ReactElement, useEffect, useState } from "react";
import { Button, Divider, Tab, Tabs, useDisclosure } from "@nextui-org/react";
import { accentFont, cartLocalStorageKey } from "@/constants";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { cartSelector, remove } from "@/store/slices/cartStore.slice";
import { useRouter } from "next/navigation";
import { ItemPayList } from "@/components/Pay/ItemList";
import { Heading } from "@/components/Heading";
import { useGetProfile } from "@/api/identity/hooks/customer";
import {
  useCreateDeliveryInformation,
  useGetAllDeliveryInformation,
} from "@/api/orders/hooks/deliveryInformation";
import { useForm } from "react-hook-form";
import { CreateDeliveryInformationRequest } from "@/api/orders/hooks/requests/deliveryInformation/createDeliveryInformation.request";
import { Input, Textarea } from "@nextui-org/input";
import { Card, CardBody } from "@nextui-org/card";
import { createDeliveryInformationSchema } from "@/api/orders/validations/deliveryInformation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCreateOrder } from "@/api/orders/hooks/orders/useCreateOrder";
import toast from "react-hot-toast";
import { localStorageServices } from "@/service";
import { DeliveryInformationForm } from "@/components/DeliveryInformation";
import { HiCheck, HiPencilAlt, HiX } from "react-icons/hi";
import { DeliveryInformation } from "@/api/orders/models";
import { CitySelect } from "@/components/CitySelect";
import { DistrictSelect } from "@/components/DistrictSelect";
import { WardSelect } from "@/components/WardSelect";
import {
  useCheckVnPayTransaction,
  useCreateVnPayPayment,
} from "@/api/orders/hooks/transaction";
import { AppliedPromo } from "@/components/AppliedPromo";

export default function OrderPayPage(): ReactElement {
  const cart = useAppSelector(cartSelector);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    if (cart.items.length == 0) {
      router.push("/");
    }
  }, [cart.items.length, router]);

  const { data: customer } = useGetProfile();

  const { data: deliveryInformationList } = useGetAllDeliveryInformation({
    request: { customerId: customer?.id ?? -1 },
  });

  const { trigger: createDeliveryTrigger, isMutating: postingDelivery } =
    useCreateDeliveryInformation();

  const { trigger: createOrderTrigger, isMutating: postingOrder } =
    useCreateOrder();

  const {
    trigger: createVnPayTransaction,
    isMutating: creatingVnPayTransaction,
  } = useCreateVnPayPayment();

  const [toCheckTransactionId, setCheckTransactionId] = useState<number>();

  const {
    data: checkVnPayTransaction,
    isLoading: checkingVnPayTransaction,
    error,
  } = useCheckVnPayTransaction(toCheckTransactionId);

  useEffect(() => {
    if (checkVnPayTransaction !== undefined) {
      toast.success("Đã đặt hàng thành công!");
      localStorageServices.remove(cartLocalStorageKey);
      dispatch(remove);
      router.push("/orders/pay/success/" + checkVnPayTransaction.orderId, {});
    }
  }, [checkVnPayTransaction, dispatch, router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
    resetField,
  } = useForm<CreateDeliveryInformationRequest>({
    resolver: yupResolver<CreateDeliveryInformationRequest>(
      createDeliveryInformationSchema,
    ),
  });

  const [paymentMethod, setPaymentMethod] = useState<number>(1);

  const onSubmit = async (data: CreateDeliveryInformationRequest) => {
    let informationId = deliveryData?.id ?? -1;
    if (!isUsingSaved) {
      const informationPosted = await createDeliveryTrigger(data);
      if (informationPosted !== null && informationPosted.isSuccess) {
        informationId = informationPosted.data.id;
      } else {
        return;
      }
    }
    const orderPlaced = await createOrderTrigger({
      deliveryInformationId: informationId,
      paymentMethodId: paymentMethod,
      orderDetails: cart.items.map((item) => ({
        productId: item.productId,
        amount: item.amount,
        sizeCode: item.sizeCode,
      })),
      promoId: cart?.promo?.id,
    });
    switch (paymentMethod) {
      case 1:
        if (orderPlaced !== null && orderPlaced.isSuccess) {
          toast.success("Đã đặt hàng thành công!");
          localStorageServices.remove(cartLocalStorageKey);
          dispatch(remove);
          router.push("/orders/pay/success/" + orderPlaced.data.id, {});
        }
        break;
      case 3:
        if (orderPlaced !== null && orderPlaced.isSuccess) {
          const vnpayPaymentCreated = await createVnPayTransaction({
            orderId: orderPlaced.data.id,
            paymentMethodId: 3,
            phoneNumber: data.phone,
          });

          if (vnpayPaymentCreated.paymentUrl) {
            router.push(vnpayPaymentCreated.paymentUrl);
          }

          setCheckTransactionId(vnpayPaymentCreated.transactionId);
        }
    }
  };

  const { isOpen, onOpenChange, onOpen } = useDisclosure();
  const [deliveryData, setDeliveryData] = useState<DeliveryInformation>();

  const [isUsingSaved, setIsUsingSaved] = useState<boolean>(false);

  return (
    <div>
      <div className={"flex gap-2 items-center w-full "}>
        <div className={"flex flex-col md:flex-row gap-2 items-center"}>
          <Button
            variant={"bordered"}
            className={"rounded-full mr-2"}
            onPress={() => router.back()}
          >
            Trở lại
          </Button>
          <span className={"text-xl font-semibold"}>Thanh toán</span>
        </div>
      </div>

      <div className={"md:grid-cols-8 grid grid-cols-1 gap-4"}>
        <div className={"col-span-5"}>
          <div>
            <Heading className={"text-xl mt-6"}>Thông tin thanh toán</Heading>
            {customer === undefined ? (
              <p className={"text-sm"}>
                Nhập thông tin giao hàng hoặc{" "}
                <b
                  className={"text-accent cursor-pointer"}
                  onClick={() => router.push("/login")}
                >
                  Đăng nhập
                </b>
              </p>
            ) : (
              <>
                <p className={"text-sm"}>Nhập thông tin giao hàng </p>
                <div className={"flex justify-between items-center"}>
                  <p className={"my-6 font-semibold"}>Lựa chọn có sẳn</p>
                  <Button
                    variant={"bordered"}
                    size={"sm"}
                    onClick={() => {
                      setDeliveryData(undefined);
                      onOpen();
                    }}
                  >
                    Thêm địa chỉ
                  </Button>
                </div>
                <div
                  className={
                    "relative max-h-[175px] h-[175px] w-full overflow-y-auto p-2 flex gap-4 justify-start items-center"
                  }
                >
                  <DeliveryInformationForm
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                    customerId={customer.id}
                    data={deliveryData}
                  />
                  {deliveryInformationList !== undefined &&
                  deliveryInformationList?.length > 0 ? (
                    <>
                      {deliveryInformationList.map((item) => (
                        <div
                          className={
                            "relative shadow h-full min-w-[350px] p-4 rounded-xl hover:scale-105 transition-all"
                          }
                          key={`DeliveryInformation${item.id}`}
                        >
                          <div
                            className={"absolute top-2 right-2 cursor-pointer"}
                            onClick={() => {
                              setDeliveryData(item);
                              onOpen();
                            }}
                          >
                            <HiPencilAlt />
                          </div>
                          <Heading className={"text-md mb-4"}>
                            {item.name}
                          </Heading>
                          <p className={"text-sm w-[75%]"}>
                            <b>Địa chỉ: </b>
                            {item.fullAddress}
                          </p>
                          <p className={"text-sm w-[75%]"}>
                            <b>SĐT: </b>
                            {item.phone}
                          </p>
                          <Button
                            className={
                              "absolute bottom-2 right-2 cursor-pointer transition-all"
                            }
                            isIconOnly={
                              deliveryData?.id === item.id && isUsingSaved
                            }
                            variant={
                              deliveryData?.id === item.id && isUsingSaved
                                ? "solid"
                                : "ghost"
                            }
                            color={
                              deliveryData?.id === item.id && isUsingSaved
                                ? "primary"
                                : "default"
                            }
                            onClick={() => {
                              if (
                                deliveryData?.id !== item.id &&
                                !isUsingSaved
                              ) {
                                setDeliveryData(item);
                                setIsUsingSaved(true);
                                reset({ ...item }, { keepDirty: true });
                              } else {
                                setDeliveryData(undefined);
                                setIsUsingSaved(false);
                                // @ts-ignore
                                setValue();
                              }
                            }}
                          >
                            {deliveryData?.id === item.id && isUsingSaved ? (
                              <>
                                <HiX />
                              </>
                            ) : (
                              <>
                                <HiCheck /> Dùng
                              </>
                            )}
                          </Button>
                        </div>
                      ))}
                    </>
                  ) : (
                    <>Chưa có thông tin sẳn</>
                  )}
                </div>
                <p className={"my-2 font-semibold"}>Hoặc nhập thông tin mới</p>
              </>
            )}
            <form
              className={"my-8  grid-cols-2 grid gap-2"}
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className={"col-span-2 font-semibold"}>
                <p>Thông tin cá nhân</p>
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
                  isDisabled={isUsingSaved}
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
                  isDisabled={isUsingSaved}
                />
              </div>
              <div className={"col-span-2 font-semibold"}>
                <p>Địa chỉ nhận hàng</p>
              </div>
              <div className={"col-span-2 flex gap-4"}>
                <CitySelect
                  isDisabled={isUsingSaved}
                  onSelected={(cityId) => {
                    if (cityId === undefined) {
                      resetField("cityId");
                      return;
                    }
                    setValue("cityId", cityId);
                  }}
                  defaultValue={deliveryData?.cityId}
                />
                <DistrictSelect
                  isDisabled={isUsingSaved}
                  cityId={watch("cityId")}
                  onSelected={(districtId) => {
                    if (districtId === undefined) {
                      resetField("districtId");
                      return;
                    }
                    setValue("districtId", districtId);
                  }}
                  defaultValue={deliveryData?.districtId}
                />
                <WardSelect
                  isDisabled={isUsingSaved}
                  districtId={watch("districtId")}
                  onSelected={(wardId) => {
                    if (wardId === undefined) {
                      resetField("wardId");
                      return;
                    }
                    setValue("wardId", wardId);
                  }}
                  defaultValue={deliveryData?.wardId}
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
                  isDisabled={isUsingSaved}
                />
              </div>
              <div className={"col-span-2 font-semibold"}>
                <p>Phương thức thanh toán</p>
              </div>
              <div className={"col-span-2"}>
                <Tabs
                  aria-label="Options"
                  selectedKey={paymentMethod.toString()}
                  onSelectionChange={(key: Key) =>
                    setPaymentMethod(parseInt(key.toString()))
                  }
                >
                  <Tab key="1" title="Tiền mặt">
                    <Card shadow={"sm"}>
                      <CardBody>
                        Thanh toán tiền mặt sau khi nhận hàng hoặc thanh toán và
                        lấy hàng trực tiếp tại các cửa hàng của August Perfume
                      </CardBody>
                    </Card>
                  </Tab>
                  {/*<Tab key="2" title="Momo" isDisabled={true}>*/}
                  {/*  <Card shadow={"sm"}>*/}
                  {/*    <CardBody>*/}
                  {/*      Thanh toán thông qua dịch vụ Thanh toán trực tuyến Momo*/}
                  {/*    </CardBody>*/}
                  {/*  </Card>*/}
                  {/*</Tab>*/}
                  <Tab key="3" title="VnPay">
                    <Card shadow={"sm"}>
                      <CardBody>
                        <p>Nhấn Tiếp tục để thanh toán thông qua VnPay</p>
                      </CardBody>
                    </Card>
                  </Tab>
                </Tabs>
              </div>
              <div className={"col-span-2 flex justify-end"}>
                <Button
                  type={"submit"}
                  color={"primary"}
                  isLoading={
                    postingDelivery ||
                    postingOrder ||
                    checkingVnPayTransaction ||
                    error !== undefined ||
                    creatingVnPayTransaction
                  }
                >
                  {paymentMethod === 1 ? "Tiến hành tạo đơn" : "Tiếp tục"}
                </Button>
              </div>
            </form>
          </div>
        </div>
        <div
          className={
            "col-span-3 rounded-md shadow h-fit p-4 flex-col flex gap-2 border-t-[10px] border-accent-600"
          }
        >
          <ItemPayList />
          <Divider />
          <div className={"flex justify-between gap-2"}>
            <p className={"uppercase"}>Tạm tính</p>
            <p className={"font-semibold " + accentFont.className}>
              {cart.total.toLocaleString()} đ
            </p>
          </div>
          <div className={"flex justify-between gap-2"}>
            <p className={"uppercase"}>Vận chuyển</p>
            <p className={"font-semibold text-green " + accentFont.className}>
              Miễn phí
            </p>
          </div>
          {cart.promo !== undefined && (
            <div>
              <p className={"uppercase mb-2"}>Giảm giá</p>
              <AppliedPromo promoCode={cart.promo.code} />
            </div>
          )}
          <Divider className={"my-4"} />
          <div className={"flex justify-between gap-2"}>
            <p className={"uppercase text-xl"}>Tổng tiền</p>
            <p
              className={
                "font-semibold text-green text-2xl " + accentFont.className
              }
            >
              {(cart.total - (cart?.promo?.value ?? 0)).toLocaleString()} đ
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
