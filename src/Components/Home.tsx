import React, { useEffect, useState } from "react";
import ServerUser from "./Services/bikeStationsServices";
import { BikeStationsData, BikeStationsDataToAddress } from "./Services/bikeStationsServices";
import imgStation from "../assets/estacion.jpg";
import bicycleStation from "../assets/parking.png"
import electricBicycle from "../assets/electric-bike.png"
import ScrollButton from "./ScrollButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChargingStation, faCircleXmark, faClockRotateLeft, faLocationDot, faMagnifyingGlass, faMapLocationDot, faParking, faPersonBiking, faRotateLeft, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import "../Scss/Home.scss"
import Spinner from "./Spinner";

const Home: React.FC = () => {
    const [stations, setStations] = useState<BikeStationsData[]>([]);
    const [displayedStations, setDisplayedStations] = useState<BikeStationsData[]>([]);
    const [displayedCount, setDisplayedCount] = useState<number>(10);
    const [searchText, setSearchText] = useState<string>('');
    const [loading, setLoading] = useState<Boolean>(false)
    const [isInputEmpty, setIsInputEmpty] = useState<boolean>(true);

    useEffect(() => {
        setLoading(true)
        const fetchData = async () => {
            const serverUser = new ServerUser();
            try {
                const dataBike: BikeStationsData = await serverUser.getBikeStations();
                const dataBikeToAddress: BikeStationsDataToAddress = await serverUser.getBikeStationsToAddress();
                const combinedData = dataBike.data.stations.map((station: any) => {
                    const matchingStation = dataBikeToAddress.data.stations.find((s: any) => s.station_id === station.station_id);
                    if (matchingStation) {
                        return {
                            station_id: station.station_id,
                            num_bikes_available: station.num_bikes_available,
                            num_bikes_available_types: station.num_bikes_available_types,
                            num_bikes_disabled: station.num_bikes_disabled,
                            num_docks_available: station.num_docks_available,
                            num_docks_disabled: station.num_docks_disabled,
                            last_reported: station.last_reported,
                            is_charging_station: station.is_charging_station,
                            status: station.status,
                            name: matchingStation.name,
                            lat: matchingStation.lat,
                            lon: matchingStation.lon,
                            address: matchingStation.address,
                            post_code: matchingStation.post_code,
                            capacity: matchingStation.capacity,
                            groups: matchingStation.groups
                            // Agrega más campos según sea necesario
                        };
                    } else {
                        // Si no se encuentra una estación coincidente, puedes manejarlo como desees
                        return station;
                    }
                });
                setStations(combinedData);
                setLoading(false)
            } catch (error) {
                console.error('Error fetching user data:', error);
                setLoading(false)
            }
        };
        fetchData();
    }, []);
    useEffect(() => {
        // Actualizar los elementos mostrados cuando el estado de 'stations' cambie
        setDisplayedStations(stations.slice(0, displayedCount));
    }, [stations, displayedCount]);
    useEffect(() => {
        // Filtrar estaciones cuando el texto de búsqueda cambie 
        const filteredStations = stations.filter(station =>
            (station.station_id && station.station_id.toLowerCase().includes(searchText.toLowerCase())) ||
            (station.status && station.status.toLowerCase().includes(searchText.toLowerCase())) ||
            (station.address && station.address.toLowerCase().includes(searchText.toLowerCase())) ||
            (station.name && station.name.toLowerCase().includes(searchText.toLowerCase())) ||
            (station.post_code && station.post_code.toLowerCase().includes(searchText.toLowerCase()))
        );
        setDisplayedStations(filteredStations.slice(0, displayedCount));
    }, [searchText, displayedCount, stations]);
    const handleShowMore = () => {
        setDisplayedCount(prevCount => prevCount + 10); // Mostrar los siguientes 15 elementos
    };
    const handleShowLess = () => {
        setDisplayedCount(prevCount => Math.max(prevCount - 10, 10)); // Mostrar los 50 elementos anteriores, asegurándose de que no se muestren menos de 50 elementos
    };
    const formatDate = (timestamp: number): string => {
        // Crear un nuevo objeto de fecha a partir del timestamp (en milisegundos)
        let fecha = new Date(timestamp * 1000);
        // Obtener los componentes de fecha y hora
        let dia = fecha.getDate();
        let mes = fecha.getMonth() + 1; // Nota: January es 0
        let anio = fecha.getFullYear();
        let hora = fecha.getHours();
        let minutos = fecha.getMinutes();
        // Formatear los componentes para asegurar que tengan dos dígitos
        if (dia < 10) {
            dia = Number('0' + dia);
        }
        if (mes < 10) {
            mes = Number('0' + mes);
        }
        if (hora < 10) {
            hora = Number('0' + hora);
        }
        if (minutos < 10) {
            minutos = Number('0' + minutos);
        }
        // Crear la cadena de fecha y hora en formato dd/mm/yyyy H:M
        var fechaFormateada = dia + '/' + mes + '/' + anio + ' ' + hora + ':' + minutos;
        return fechaFormateada;
    }
    const handleInputChange = (event: any) => {
        const text = event.target.value;
        setSearchText(text);
        setIsInputEmpty(text === '');
    };
    const handleClearSearch = () => {
        setSearchText('');
        setIsInputEmpty(true);
    };
    return (
        <main className="container-fluid p-4">
            {loading ? (
                <div className="containerLoading">
                    <Spinner />
                </div>
            ) : (
                <section className="contenedorMain">
                    <div className="row justify-content-center">
                        <div className="search-container d-flex align-items-center col-xxl-9 col-xl-9 col-lg-8 col-md-8 col-sm-11 col-11">
                            <input
                                className="form-control search"
                                type="text"
                                placeholder="Buscar estación..."
                                value={searchText}
                                onChange={handleInputChange}
                            />
                            {isInputEmpty ? (
                                <FontAwesomeIcon className="m-1" icon={faMagnifyingGlass} />
                            ) : (
                                <FontAwesomeIcon
                                    icon={faCircleXmark}
                                    className="clear-icon m-1"
                                    onClick={handleClearSearch}
                                />
                            )}
                        </div>
                    </div>
                    {searchText && displayedStations.length === 0 && (
                        <div className="d-flex align-items-center justify-content-center emptyData">
                            <p className="p-0 m-0">No se encontraron estaciones que coincidan con la búsqueda.</p>
                            {/* <FontAwesomeIcon onClick={handleClearSearch} icon={faTrashCan} className="ms-2 btn-empty" /> */}
                        </div>
                    )}
                    <section className="row">
                        {displayedStations.map((bicy: BikeStationsData, index) => (
                            <article className="d-flex mt-3 col-lg-4 col-md-6 col-xl-4 col-sm-6 col-12 col-xxl-3" key={index}>
                                <div className="card mb-3 p-3">
                                    <img src={imgStation} className="rounded-1" alt="estacion" style={bicy.status !== "IN_SERVICE" ? { opacity: 0.6 } : { opacity: 1 }} />
                                    <div className="card-body d-flex flex-column justify-content-between align-content-between">
                                        <p className="text-center">Estación <strong>{bicy.station_id}</strong> </p>
                                        {bicy.status === "IN_SERVICE" ? (
                                            <div className="inservice mb-2">
                                                <img className="imgBicycleStation" src={bicycleStation} />
                                                <p className="ms-2 p-0 m-0">{bicy.status}</p>
                                            </div>
                                        ) : (
                                            <div className="outofservice mb-2">
                                                <img className="imgBicycleStation" src={bicycleStation} alt="" style={{ opacity: 0.6 }} />
                                                <p className="ms-2 p-0 m-0">{bicy.status}</p>
                                            </div>
                                        )}
                                        <p><FontAwesomeIcon className="mx-2" icon={faLocationDot} />{bicy.address ? bicy.address : "Sin Datos"}</p>
                                        <p><FontAwesomeIcon className="mx-2" icon={faMapLocationDot} />{bicy.name ? bicy.name : "Sin Datos"}</p>
                                        {bicy.num_bikes_available > 0 ? (
                                            <p>
                                                <FontAwesomeIcon className="mx-2" icon={faPersonBiking} /> Bicis Disponibles: {bicy.num_bikes_available}
                                            </p>
                                        ) : (
                                            <p>
                                                <FontAwesomeIcon className="mx-2" icon={faPersonBiking} /> Bicis Disponibles: {bicy.num_bikes_available}
                                            </p>
                                        )}
                                        {bicy.num_docks_available > 0 ? (
                                            <p>
                                                <FontAwesomeIcon className="mx-2" icon={faParking} />  Espacio para Devolver: {bicy.num_docks_available}
                                            </p>
                                        ) : (
                                            <p>
                                                <FontAwesomeIcon className="mx-2" icon={faParking} />  Espacio para Devolver: {bicy.num_docks_available}
                                            </p>
                                        )}
                                        <p><img className="electricBicycle mx-2" src={electricBicycle} alt="" />{bicy.num_bikes_available_types.ebike}</p>
                                        <p><FontAwesomeIcon className="mx-2" icon={faClockRotateLeft} />{bicy.last_reported ? formatDate(bicy.last_reported) : "Sin datos"}</p>
                                        {bicy.is_charging_station === true ? (
                                            <span>
                                                <FontAwesomeIcon className="mx-2" icon={faChargingStation} /> Si
                                            </span>
                                        ) : (
                                            <span>
                                                <FontAwesomeIcon className="mx-2" icon={faChargingStation} />  No
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </article>
                        ))}
                    </section>
                    {stations.length > displayedCount && (
                        <div className="d-flex justify-content-center align-items-center m-3">
                            <button className="btn btn-primary" onClick={handleShowMore}>Mostrar más</button>
                            {displayedCount > 10 && (
                                <FontAwesomeIcon className="mx-2 boton-menos" icon={faRotateLeft} onClick={handleShowLess} style={{ cursor: "pointer" }} />
                            )}
                        </div>
                    )}
                    <ScrollButton />
                </section>
            )}
        </main>
    );
}

export default Home;
