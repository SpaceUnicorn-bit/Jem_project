<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use App\Helpers\jwtAuthAdmin;
use Illuminate\Support\Facades\DB;
use App\article;
use Input;
use Image;
use App\outfit;
class ArticleController extends Controller
{

    public function index(Request $request)
    {
       //listado de los articulos
        $articles = article::all();
        $productCount = count($articles);
        if ($productCount <= 0) {
            return response()->json(array(
                'articles' => $articles,
                'status'   => 'void'
            ), 200);
        }
        if ($productCount > 1) {        
            for ($i=0; $i < $productCount ; $i++) { 
                $contents = Storage::get($articles[$i]->photo);
                $articles[$i]->photo = base64_encode($contents);
            }
        }else{
            $contents = Storage::get($articles[0]->photo);
            $articles[0]->photo = base64_encode($contents);
        }
        return response()->json(array(
            'articles' => $articles,
            'status'   => 'success'
        ), 200);
    }
    
    public function show($id)
    {
        $articles = article::find($id);
        $contents = Storage::get($articles->photo);
        $articles->photo = base64_encode($contents);
        return response()->json(array(
            'articles' => $articles,
            'status'   => 'success'
        ), 200);
    }

    public function store(Request $request) {
        $hash = $request->header('Authorization', null);
        $jwtAuthAdmin = new jwtAuthAdmin();
        $checkToken = $jwtAuthAdmin->checkToken($hash);
        if ($checkToken) {
            // recoger datos del POST
            $json =  $request->input('json', null);
            $params = json_decode($json);
            $paramsArray = json_decode($json,true);
            //validacion
            $validate = Validator::make($paramsArray, [
                'name'        => 'required',
                'detail'      => 'required',
                'pricePublic' => 'required',
                'priceMajor'  => 'required',
                'priceTuB'    => 'required',
                'department'  => 'required',
                'weight'      => 'required',
                'photo'       => 'required',
                'gender'      => 'required'
            ]);
            if ($validate->fails()) {
                return response()->json($validate->errors(),400);
            }
            //añadir verificacion de guardado del producto antes que la imagen
            $img =  $params->file;
            $img = str_replace('data:image/jpeg;base64,', '', $img);
            $img = str_replace(' ', '+', $img);
            $imgName = time() . $params->photo;
            Storage::disk('local')->put($imgName, base64_decode($img));
            //guardar articulo
            $article = new article();
            $article->name         = $params->name;
            $article->detail       = $params->detail;
            $article->pricePublic  = $params->pricePublic;
            $article->priceMajor   = $params->priceMajor;
            $article->priceTuB     = $params->priceTuB;
            $article->department   = $params->department;
            $article->weight       = $params->weight;
            $article->photo        = $imgName;
            $article->gender       = $params->gender;

            $article->save();
            $data = array(
                'article' => $article ,
                'status'  => 'success',
                'code'    => 200,
            );
        } else {
            // Error
            $data = array(
                'message' => 'login incorrecto',
                'status' => 'Error',
                'code'  => 400,
            );
        }
        return response()->json($data, 200);
    }

    public function update($id, Request $request)
    {
        $hash = $request->header('Authorization', null);
        $jwtAuthAdmin = new jwtAuthAdmin();
        $checkToken = $jwtAuthAdmin->checkToken($hash);

        if ($checkToken) {
            $json = $request->input('json', null);
            $params = json_decode($json);
            $paramsArray = json_decode($json, true);
            //validacion
            $validate = Validator::make($paramsArray, [
                'name'        => 'required',
                'detail'      => 'required',
                'pricePublic' => 'required',
                'priceMajor'  => 'required',
                'priceTuB'    => 'required',
                'department'  => 'required',
                'weight'      => 'required',
                'photo'       => 'required',
                'gender'      => 'required'
            ]);
            if ($validate->fails()) {
                return response()->json($validate->errors(),400);
            }
            
            $imgDB = article::where('id', $id)->first();
            $lengthImg = strlen($params->photo);
            if ($lengthImg <= 100) {
                $img =  $params->file;
                $img = str_replace('data:image/jpeg;base64,', '', $img);
                $img = str_replace(' ', '+', $img);
                $imgName = time() . $params->photo;
                $paramsArray['photo'] = $imgName;
                unset($paramsArray['id']);
                unset($paramsArray['created_at']);
                unset($paramsArray['file']);
                Storage::delete($imgDB->photo);
                Storage::disk('local')->put($imgName, base64_decode($img));
                $article = article::where('id', $id)->update($paramsArray);
            }else {
                $route = public_path().'\catalogo'.'\/';
                $imgRoute = str_replace('/', '', $route);
                $imgRoute = $imgRoute . $paramsArray['photo'];
                Storage::delete($imgDB->photo);
                $paramsArray['photo'] = time() .'.jpg';
                $img = $paramsArray['file'];
                $img = str_replace('data:image/jpeg;base64,', '', $img);
                $img = str_replace(' ', '+', $img);
                unset($paramsArray['id']);
                unset($paramsArray['created_at']);
                unset($paramsArray['file']);
                Storage::disk('local')->put($paramsArray['photo'], base64_decode($img));
                $article = article::where('id', $id)->update($paramsArray);
            }
            // Actualizar datos del articulo
            $data = array(
                'article' => $paramsArray,
                'status'  => 'success',
                'code'    => 200 
            );
        } else {
            //Error
            $data = array(
                'message' => 'login incorrecto',
                'status' => 'Error',
                'code'  => 400,
            );
        }

        return response()->json($data, 200);
    }

    public function destroy($id, Request $request){

        //comprobar resgitro
        $article = article::find($id);
        //Borrar registro
        $route = public_path().'\catalogo'.'\/';
        $imgRoute = str_replace('/', '', $route);
        $imgRoute = $imgRoute . $article->photo;
        Storage::delete($article->photo);
        $article->delete();
        $data = array(
            'article' => $article,
            'status'  => 'success',
            'code'    => 200
        );
        return response()->json($data, 200);
    }
}