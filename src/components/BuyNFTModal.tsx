import {Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@nextui-org/react";
import usePurchaseForwardStore from "../stores/purchaseForwardStore";

interface BuyNFTModalProps {
  isOpen: boolean;
  onOpenChange: (v: boolean) => void;
}

export const BuyNFTModal = ({ isOpen, onOpenChange }: BuyNFTModalProps) => {
  const [project, buy, loading] = usePurchaseForwardStore(state => [state.project, state.buy, state.loading]);

  return <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
    <ModalContent>
      {() => (
        <>
          <ModalHeader className="flex flex-col gap-1">{project!.name} | Forwards</ModalHeader>
          <ModalBody>
            Price: {project!.token.price} ℏ
          </ModalBody>
          <ModalFooter>
            <Button isLoading={loading} color="primary" onPress={() => {
              buy().then(() => {
                onOpenChange(false);
              })
            }}>
              Buy
            </Button>
          </ModalFooter>
        </>
      )}
    </ModalContent>
  </Modal>
}
