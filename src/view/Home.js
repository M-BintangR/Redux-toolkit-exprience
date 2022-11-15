import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="container my-5">
            <div className="card">
                <h3 className='p-3'>Latihan
                    <Link to={'/'} className='btn btn-dark float-end'>Back</Link>
                </h3>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-striped">
                            <thead className="table-dark">
                                <tr>
                                    <th>Latihan</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Latihan 1</td>
                                    <td><Link to={'/latihan1'} className='btn btn-success btn-sm'>View</Link></td>
                                </tr>
                                <tr>
                                    <td>Latihan 2</td>
                                    <td><Link to={'/latihan2'} className='btn btn-success btn-sm'>View</Link></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home