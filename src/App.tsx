import "./App.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserFormModal from "@/components/page/userFormModal";
import Header from "./components/atoms/header";
import UserListing from "./components/page/userListing";
import { setItems, addItem } from "@/slices/itemSlice";
import type { RootState } from "./store/index";
import type { Item } from "./types";
import toaster from "./utils/toaster";
import { Toaster } from "@/components/ui/sonner";
import NoItem from "./components/atoms/noItems";

function App() {
  const API_URL = import.meta.env.API_URL;
  const WEB_SOCKET_URL = import.meta.env.WEB_SOCKET_URL;

  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state?.items?.items);
  const [_, setWs] = useState<WebSocket | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const modalHandler = () => {
    setIsModalOpen((prev) => !prev);
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(API_URL + "/api/items");
        if (response.ok) {
          const data: Item[] = await response.json();
          dispatch(setItems(data));
        }
      } catch (err) {
        toaster({
          message: "Error while fetching the items",
          description: "",
        });
      }
    })();
  }, []);

  useEffect(() => {
    const socket = new WebSocket(WEB_SOCKET_URL);

    socket.onopen = () => {
      toaster({
        message: "Socket connected successfully",
        description: "",
      });
    };
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === "initial_items") {
        dispatch(setItems(message.payload));
      } else if (message.type === "new_item") {
        dispatch(addItem(message.payload));
        toaster({
          message: "New item added to the list",
          description: "",
        });
      }
    };
    socket.onclose = () => {
      toaster({
        message: "Socket disconnected",
        description: "Refresh the page to reconnect",
      });
    };
    setWs(socket);

    return () => {
      socket.close();
    };
  }, [dispatch]);

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <Header onClickHanlder={modalHandler} />
      {items?.length ? <UserListing users={items} /> : <NoItem  onClick={modalHandler}/>}
      {isModalOpen ? (
        <UserFormModal isModalOpen={isModalOpen} onClose={modalHandler} />
      ) : null}
      <Toaster />
    </div>
  );
}

export default App;
