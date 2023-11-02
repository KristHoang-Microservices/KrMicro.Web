import { ReactElement } from "react";
import { CiFilter } from "react-icons/ci";
import { Button } from "@nextui-org/react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/modal";

export interface FilterBarProps {
  form: ReactElement;
  submitButton: ReactElement;
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  onOpenChange: (isOpen: boolean) => void;
  name: string;
}
export function FilterBar({
  form,
  submitButton,
  isOpen = false,
  onOpen,
  onClose,
  onOpenChange,
  name,
}: FilterBarProps): ReactElement {
  return (
    <div
      className={"w-full px-4 py-2 rounded-full flex justify-between bg-white"}
    >
      <span className={"text-xl font-semibold"}>{name}</span>
      <Button onPress={onOpen} variant={"bordered"}>
        Bộ lọc
        <CiFilter className={"text-2xl"} />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size={"2xl"}>
        <ModalContent>
          <ModalHeader>Bộ lọc</ModalHeader>
          <ModalBody>{form}</ModalBody>
          <ModalFooter>
            <Button color={"default"} variant={"light"} onPress={onClose}>
              Đóng
            </Button>
            {submitButton}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
