import {Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@nextui-org/react";
import usePurchaseStore from "../stores/purchase.ts";

interface BuyNFTModalProps {
  isOpen: boolean;
  onOpenChange: (v: boolean) => void;
}

export const BuyNFTModal = ({ isOpen, onOpenChange }: BuyNFTModalProps) => {
  const [project, buy, loading] = usePurchaseStore(state => [state.project, state.buy, state.loading]);

  return <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
    <ModalContent>
      {() => (
        <>
          <ModalHeader className="flex flex-col gap-1">{project!.name} | NFT</ModalHeader>
          <ModalBody>
            Price: {project!.token.price} ℏ
          </ModalBody>
          <ModalFooter>
            <Button isLoading={loading} color="primary" onPress={() => {
              buy();
            }}>
              Buy
            </Button>
          </ModalFooter>
        </>
      )}
    </ModalContent>
  </Modal>
}
