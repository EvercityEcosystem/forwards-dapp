import {Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@nextui-org/react";
import useMintMascotStore from "../stores/mintMascotStore.ts";

interface BuyNFTModalProps {
  isOpen: boolean;
  onOpenChange: (v: boolean) => void;
}

export const BuyMascotModal = ({ isOpen, onOpenChange }: BuyNFTModalProps) => {
  const [mascot, mint, loading] = useMintMascotStore(state => [state.mascot, state.mint, state.loading]);

  return <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
    <ModalContent>
      {() => (
        <>
          <ModalHeader className="flex flex-col gap-1">Mint mascot</ModalHeader>
          <ModalBody>
            {mascot!.name}
          </ModalBody>
          <ModalFooter>
            <Button isLoading={loading} color="primary" onPress={() => {
              mint().then(() => {
                onOpenChange(false);
              })
            }}>
              Mint
            </Button>
          </ModalFooter>
        </>
      )}
    </ModalContent>
  </Modal>
}
