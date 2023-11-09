import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Ad from "../assets/ad.jpeg";

const ClientAd = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { user } = useSelector((store) => store.helper);

  useEffect(() => {
    if (user) navigate(`/update/${id}`);
  }, []);

  return (
    <div className="flex justify-center">
      <img src={Ad} className="object-contain h-screen p-4" alt="ad" />
    </div>
  );
};
export default ClientAd;
